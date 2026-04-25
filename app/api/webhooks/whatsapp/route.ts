import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// 1. GET Request: Used by Meta to verify the webhook URL
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.VERIFY_TOKEN

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WhatsApp Webhook Verified!')
    // Must return the challenge exactly as plain text
    return new Response(challenge, { status: 200 })
  } else {
    return new Response('Verification failed', { status: 403 })
  }
}

// 2. POST Request: Used by Meta to push incoming messages
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 7. Log incoming webhook payloads for debugging
    console.log('--- WHATSAPP WEBHOOK PAYLOAD ---')
    console.log(JSON.stringify(body, null, 2))
    console.log('--------------------------------')

    // Ensure it's a WhatsApp API webhook
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages && change.value.messages[0]) {
            const messageData = change.value.messages[0]
            const contactData = change.value.contacts?.[0]
            const phoneId = change.value.metadata.phone_number_id

            const fromNumber = messageData.from
            const textContent = messageData.text?.body || '[Non-text message]'

            console.log(`[INCOMING WHATSAPP MESSAGE]`)
            console.log(`Sender Number: ${fromNumber}`)
            console.log(`Message Text: ${textContent}`)
            
            const msgId = messageData.id

            // Identify the user by checking who connected this phoneId
            const supabase = await createClient()
            const { data: integrationData } = await supabase
              .from('integrations')
              .select('user_id')
              .eq('provider', 'whatsapp')
              // Note: in a robust system we'd query by metadata->>'phone_id', but 
              // for this dev setup we just grab the single connection.
              // We'll try to find the integration that matches the phoneId
              .contains('metadata', { phone_id: phoneId })
              .single()

            if (!integrationData) {
              console.error('No Sandesh AI user found for WhatsApp Phone ID:', phoneId)
              continue
            }

            const userId = integrationData.user_id

            // Check if conversation exists for this phone number
            const { data: existingConv } = await supabase
              .from('conversations')
              .select('id')
              .eq('user_id', userId)
              .eq('external_thread_id', fromNumber)
              .eq('source', 'whatsapp')
              .single()

            let conversationId = existingConv?.id

            if (!conversationId) {
              // Extract some intent/classification using our AI placeholder or just set WARM
              const { data: newConv } = await supabase
                .from('conversations')
                .insert({
                  user_id: userId,
                  title: contactData?.profile?.name || `+${fromNumber}`,
                  source: 'whatsapp',
                  external_thread_id: fromNumber,
                  lead_status: 'WARM'
                })
                .select('id')
                .single()
              
              if (newConv) conversationId = newConv.id
            }

            if (conversationId) {
              // Insert message
              await supabase
                .from('messages')
                .insert({
                  conversation_id: conversationId,
                  sender: 'customer',
                  content: textContent,
                  source: 'whatsapp',
                  external_message_id: msgId
                })
            }
          }
        }
      }
    }

    // Always return EVENT_RECEIVED to Meta
    return new Response('EVENT_RECEIVED', { status: 200 })
  } catch (error) {
    console.error('Webhook Error:', error)
    return new Response('EVENT_RECEIVED', { status: 200 }) // Still return 200 to prevent retries
  }
}
