export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Bind the global .env credentials to this user
  const phoneId = process.env.PHONE_ID
  const accessToken = process.env.WHATSAPP_TOKEN

  if (!phoneId || !accessToken) {
    return NextResponse.json({ error: 'WhatsApp credentials not found in environment' }, { status: 500 })
  }

  const { error: upsertError } = await supabase
    .from('integrations')
    .upsert({
      user_id: user.id,
      provider: 'whatsapp',
      access_token: accessToken,
      metadata: { phone_id: phoneId }
    }, { onConflict: 'user_id,provider' })

  if (upsertError) {
    console.error('Failed to bind WhatsApp integration:', upsertError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

