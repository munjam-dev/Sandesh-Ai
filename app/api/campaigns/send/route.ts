export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import BrandedTemplate from '@/components/emails/BrandedTemplate'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_FROM = process.env.EMAIL_FROM || 'Sandesh AI <sandesh.ai.info@gmail.com>'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { campaign_id } = await request.json()

    // 1. Fetch Campaign
    const { data: campaign, error: campError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaign_id)
      .eq('user_id', user.id)
      .single()

    if (campError || !campaign) throw new Error('Campaign not found')

    // 2. Fetch Audience Emails
    let query = supabase.from('conversations').select('customer_email').eq('user_id', user.id).not('customer_email', 'is', null)
    
    if (campaign.audience === 'HOT') query = query.eq('lead_status', 'HOT')
    if (campaign.audience === 'WARM') query = query.eq('lead_status', 'WARM')
    
    const { data: leads } = await query

    // Deduplicate emails
    const uniqueEmails = Array.from(new Set(leads?.map(l => l.customer_email).filter(Boolean))) as string[]

    if (uniqueEmails.length === 0) {
      return NextResponse.json({ error: 'No valid email addresses found for this audience' }, { status: 400 })
    }

    // 3. Render React Email
    const htmlContent = await render(BrandedTemplate({
      businessName: 'Sandesh AI',
      subject: campaign.subject,
      content: campaign.content,
    }))

    // 4. Send Emails via Resend (Using Bcc for bulk or individual emails)
    // For production, iterating or using Resend batch API is better.
    let successCount = 0
    let failureCount = 0
    const logs = []

    for (const email of uniqueEmails) {
      try {
        await resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: campaign.subject,
          html: htmlContent,
        })
        logs.push({ campaign_id, email, status: 'sent' })
        successCount++
      } catch (err) {
        console.error(`Failed to send to ${email}`, err)
        logs.push({ campaign_id, email, status: 'failed' })
        failureCount++
      }
    }

    // 5. Save Logs & Update Status
    if (logs.length > 0) {
      await supabase.from('campaign_logs').insert(logs)
    }

    await supabase.from('campaigns').update({ status: 'sent' }).eq('id', campaign_id)

    return NextResponse.json({ success: true, sent: successCount, failed: failureCount })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
