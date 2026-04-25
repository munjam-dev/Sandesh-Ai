import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ConversationRow } from '@/lib/types/database'

// ----------------------------------------------------------------
// GET /api/conversations
// Returns all conversations for the authenticated user, newest first
// ----------------------------------------------------------------
export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('conversations')
    .select(`
      id,
      user_id,
      title,
      created_at,
      lead_status,
      intent,
      source,
      external_thread_id,
      messages ( id, sender, content, source, created_at )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ conversations: data })
}

// ----------------------------------------------------------------
// POST /api/conversations
// Creates a new conversation for the authenticated user
// Body: { title?: string }
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

  let title: string | undefined
  try {
    const body = await request.json()
    title = body?.title ?? undefined
  } catch {
    // title is optional — body may be empty
  }

  const { data, error } = await supabase
    .from('conversations')
    .insert({ user_id: user.id, title: title ?? null })
    .select()
    .single<ConversationRow>()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ conversation: data }, { status: 201 })
}
