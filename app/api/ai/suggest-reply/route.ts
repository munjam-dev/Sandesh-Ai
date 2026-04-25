import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAIResponse } from '@/lib/ai/openai'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Check Limits
  const { data: userData } = await supabase
    .from('users')
    .select('plan, replies_used, business_name, services, pricing_info, tone')
    .eq('id', user.id)
    .single()

  if (!userData) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const limits: Record<string, number | null> = {
    free: 100,
    starter: 1000,
    growth: null,
  }
  const limit = limits[userData.plan]

  if (limit !== null && userData.replies_used >= limit) {
    return NextResponse.json(
      { error: 'LimitReached', message: 'You have reached your plan limit.' },
      { status: 403 }
    )
  }

  // 2. Parse request body
  let body: { conversation_id: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (!body.conversation_id) {
    return NextResponse.json({ error: 'conversation_id required' }, { status: 400 })
  }

  // 3. Fetch context (last 5 messages)
  const { data: messages } = await supabase
    .from('messages')
    .select('sender, content')
    .eq('conversation_id', body.conversation_id)
    .order('created_at', { ascending: false })
    .limit(5)

  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: 'No messages to reply to' }, { status: 400 })
  }

  // Reverse so chronological order
  messages.reverse()

  // 4. Construct Context and Call OpenAI
  const settings = {
    business_name: userData.business_name,
    services: userData.services,
    pricing_info: userData.pricing_info,
    tone: userData.tone,
  }

  try {
    const aiResult = await generateAIResponse(messages, settings)

    // Update the conversation's intent and lead status in the DB
    await supabase
      .from('conversations')
      .update({ intent: aiResult.intent, lead_status: aiResult.lead_score })
      .eq('id', body.conversation_id)

    return NextResponse.json({ 
      suggestion: aiResult.reply,
      intent: aiResult.intent,
      lead_status: aiResult.lead_score
    })
  } catch (err: any) {
    console.error('AI Suggestion Error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
