export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import BrandedTemplate from '@/components/emails/BrandedTemplate'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_FROM = process.env.EMAIL_FROM || 'Sandesh AI <sandesh.ai.info@gmail.com>'

// Use Service Role Key for Cron Jobs since there's no active user session
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  // Optional: Verify Vercel Cron Secret for security
  // const authHeader = request.headers.get('authorization')
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', { status: 401 })
  // }

  try {
    const now = new Date().toISOString()

    // 1. Process Scheduled Campaigns
    const { data: scheduledCampaigns } = await supabaseAdmin
      .from('campaigns')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_at', now)

    for (const campaign of scheduledCampaigns || []) {
      // Logic identical to /api/campaigns/send but without session
      let query = supabaseAdmin.from('conversations').select('customer_email').eq('user_id', campaign.user_id).not('customer_email', 'is', null)
      if (campaign.audience === 'HOT') query = query.eq('lead_status', 'HOT')
      if (campaign.audience === 'WARM') query = query.eq('lead_status', 'WARM')
      
      const { data: leads } = await query
      const uniqueEmails = Array.from(new Set(leads?.map(l => l.customer_email).filter(Boolean))) as string[]

      if (uniqueEmails.length === 0) {
        await supabaseAdmin.from('campaigns').update({ status: 'sent' }).eq('id', campaign.id)
        continue
      }

      const htmlContent = await render(BrandedTemplate({
        businessName: 'Sandesh AI',
        subject: campaign.subject,
        content: campaign.content,
      }))

      const logs = []
      for (const email of uniqueEmails) {
        try {
          await resend.emails.send({
            from: EMAIL_FROM,
            to: email,
            subject: campaign.subject,
            html: htmlContent,
          })
          logs.push({ campaign_id: campaign.id, email, status: 'sent' })
        } catch (err) {
          logs.push({ campaign_id: campaign.id, email, status: 'failed' })
        }
      }

      if (logs.length > 0) await supabaseAdmin.from('campaign_logs').insert(logs)
      await supabaseAdmin.from('campaigns').update({ status: 'sent' }).eq('id', campaign.id)
    }

    return NextResponse.json({ success: true, processed: scheduledCampaigns?.length || 0 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
