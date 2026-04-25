export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('campaigns')
    .select('*, campaign_logs(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campaigns: data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, subject, content, audience, status, scheduled_at } = await request.json()

    const { data, error } = await supabase
      .from('campaigns')
      .insert({
        user_id: user.id,
        name,
        subject,
        content,
        audience,
        status: status || 'draft',
        scheduled_at: scheduled_at || null,
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, campaign_id: data.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
