export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PLAN_LIMITS } from '@/lib/types/database'
import type { MessageRow, Sender, Plan } from '@/lib/types/database'

// ----------------------------------------------------------------
// GET /api/messages?conversation_id=<uuid>
// Fetches all messages for a conversation (user must own it)
// ----------------------------------------------------------------
export async function GET(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')

  if (!conversationId) {
    return NextResponse.json(
      { error: 'Missing required query param: conversation_id' },
      { status: 400 }
    )
  }

  // Verify the conversation belongs to the authenticated user
  const { data: conv, error: convError } = await supabase
    .from('conversations')
    .select('id')
    .eq('id', conversationId)
    .eq('user_id', user.id)
    .single()

  if (convError || !conv) {
    return NextResponse.json(
      { error: 'Conversation not found or access denied' },
      { status: 404 }
    )
  }

  // Fetch messages in chronological order
  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('id, conversation_id, sender, content, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (msgError) {
    return NextResponse.json({ error: msgError.message }, { status: 400 })
  }

  return NextResponse.json({ messages })
}

// ----------------------------------------------------------------
// POST /api/messages
// Stores a new message and increments usage if sender === 'ai'
// Body: { conversation_id: string, sender: 'user' | 'ai', content: string }
// ----------------------------------------------------------------
export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { conversation_id?: string; sender?: Sender; content?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { conversation_id, sender, content } = body

  // Validate required fields
  if (!conversation_id || !sender || !content?.trim()) {
    return NextResponse.json(
      { error: 'conversation_id, sender, and content are required' },
      { status: 400 }
    )
  }

  if (!['user', 'ai'].includes(sender)) {
    return NextResponse.json(
      { error: 'sender must be "user" or "ai"' },
      { status: 400 }
    )
  }

  // Verify the conversation belongs to the authenticated user (RLS also enforces this)
  const { data: conv, error: convError } = await supabase
    .from('conversations')
    .select('id, source, external_thread_id')
    .eq('id', conversation_id)
    .eq('user_id', user.id)
    .single()

  if (convError || !conv) {
    return NextResponse.json(
      { error: 'Conversation not found or access denied' },
      { status: 404 }
    )
  }

  // --- Plan limit check (for ai sender) ---
  if (sender === 'ai') {
    const { data: userData } = await supabase
      .from('users')
      .select('plan, replies_used')
      .eq('id', user.id)
      .single()

    if (userData) {
      const limit = PLAN_LIMITS[userData.plan as Plan]
      if (limit !== null && userData.replies_used >= limit) {
        return NextResponse.json(
          {
            error: 'Reply limit reached',
            plan: userData.plan,
            limit,
            used: userData.replies_used,
          },
          { status: 429 }
        )
      }
    }
  }

  // --- Store the message ---
  const { data: message, error: insertError } = await supabase
    .from('messages')
    .insert({ conversation_id, sender, content: content.trim(), source: conv.source })
    .select()
    .single<MessageRow>()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 })
  }

  // --- Increment usage if this is an AI reply ---
  if (sender === 'ai') {
    // Increment replies_used on users table
    await supabase.rpc('increment_replies_used', { target_user_id: user.id })

    // Upsert usage table
    await supabase.from('usage').upsert(
      { user_id: user.id, replies_count: 1 },
      { onConflict: 'user_id', ignoreDuplicates: false }
    )

    // Use raw SQL increment on usage
    await supabase
      .from('usage')
      .update({ replies_count: supabase.rpc as unknown as number })
      .eq('user_id', user.id)
  }

  // --- Send to External Channel if needed ---
  if (conv.source === 'whatsapp' && conv.external_thread_id) {
    const { data: integration } = await supabase
      .from('integrations')
      .select('access_token, metadata')
      .eq('user_id', user.id)
      .eq('provider', 'whatsapp')
      .single()

    if (integration?.access_token && integration.metadata?.phone_id) {
      const phoneId = integration.metadata.phone_id
      try {
        const waResponse = await fetch(`https://graph.facebook.com/v25.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${integration.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: conv.external_thread_id, // Phone number
            type: 'text',
            text: { body: content.trim() }
          })
        })

        if (!waResponse.ok) {
          // Ignore errors
        }
      } catch (err) {
        // Ignore errors
      }
    }
  }

  return NextResponse.json({ message }, { status: 201 })
}

