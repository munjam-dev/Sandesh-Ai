export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
})

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { offer, audience } = await request.json()
    const { data: userData } = await supabase.from('users').select('business_name, services').eq('id', user.id).single()

    const prompt = `
      You are a SaaS marketing expert.
      Write a short, persuasive email campaign.
      Business Name: ${userData?.business_name || 'Our Company'}
      Services: ${userData?.services || 'Software services'}
      Target Audience: ${audience} leads
      Offer/Context: ${offer}
      
      Requirements:
      - Personalized (use generic greeting if name unknown)
      - Clear benefit
      - Strong CTA
      - Professional tone
      - Do NOT use placeholders like [Your Name]
      
      Return ONLY JSON in this exact format:
      {
        "subject": "The email subject line",
        "content": "The HTML body of the email. Use basic HTML tags like <p>, <br>, <strong> for formatting."
      }
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')
    return NextResponse.json({ subject: result.subject, content: result.content })
  } catch (error: any) {
    console.error('AI Generation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
