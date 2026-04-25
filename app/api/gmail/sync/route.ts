import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { google } from 'googleapis'
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

  // 1. Get the user's refresh token from integrations
  const { data: integrationData, error: intError } = await supabase
    .from('integrations')
    .select('refresh_token')
    .eq('user_id', user.id)
    .eq('provider', 'gmail')
    .single()

  if (intError || !integrationData?.refresh_token) {
    return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 })
  }

  // 2. Initialize Gmail API client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oauth2Client.setCredentials({ refresh_token: integrationData.refresh_token })
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

  try {
    // 3. Fetch recent threads (limit 10 for demo purposes)
    const res = await gmail.users.threads.list({
      userId: 'me',
      maxResults: 10,
    })

    const threads = res.data.threads || []
    let syncedCount = 0

    // 4. Process each thread
    for (const thread of threads) {
      if (!thread.id) continue

      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('external_thread_id', thread.id)
        .eq('user_id', user.id)
        .single()

      let conversationId = existingConv?.id

      // Fetch thread details to get messages
      const threadDetails = await gmail.users.threads.get({
        userId: 'me',
        id: thread.id,
      })

      const gMessages = threadDetails.data.messages || []
      if (gMessages.length === 0) continue

      // Extract subject from the first message
      let subject = 'No Subject'
      const headers = gMessages[0].payload?.headers || []
      const subjectHeader = headers.find((h) => h.name?.toLowerCase() === 'subject')
      if (subjectHeader && subjectHeader.value) {
        subject = subjectHeader.value
      }

      // Create conversation if it doesn't exist
      if (!conversationId) {
        // Extract content from first message for AI classification
        let firstContent = ''
        const firstMsg = gMessages[0]
        if (firstMsg.payload?.parts) {
          const textPart = firstMsg.payload.parts.find((p) => p.mimeType === 'text/plain')
          if (textPart?.body?.data) {
            firstContent = Buffer.from(textPart.body.data, 'base64').toString('utf-8')
          }
        } else if (firstMsg.payload?.body?.data) {
          firstContent = Buffer.from(firstMsg.payload.body.data, 'base64').toString('utf-8')
        }
        // Get User Business Settings for better AI classification
        const { data: userData } = await supabase
          .from('users')
          .select('business_name, services, pricing_info, tone')
          .eq('id', user.id)
          .single()
        
        const settings = {
          business_name: userData?.business_name,
          services: userData?.services,
          pricing_info: userData?.pricing_info,
          tone: userData?.tone,
        }

        // Use unified OpenAI function to classify lead and intent
        const messagesCtx = [{ sender: 'customer', content: `Subject: ${subject}\n\n${firstContent}` }]
        const aiClassification = await generateAIResponse(messagesCtx, settings)

        const { data: newConv, error: convError } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            title: subject,
            external_thread_id: thread.id,
            source: 'gmail',
            lead_status: aiClassification.lead_score,
            intent: aiClassification.intent,
          })
          .select('id')
          .single()

        if (convError || !newConv) {
          console.error('Error creating conversation:', convError)
          continue
        }
        conversationId = newConv.id
        syncedCount++
      }

      // Sync messages
      for (const msg of gMessages) {
        if (!msg.id) continue

        // Check if message already exists
        const { data: existingMsg } = await supabase
          .from('messages')
          .select('id')
          .eq('external_message_id', msg.id)
          .single()

        if (existingMsg) continue

        // Extract body (simplified for plain text)
        let content = ''
        if (msg.payload?.parts) {
          const textPart = msg.payload.parts.find((p) => p.mimeType === 'text/plain')
          if (textPart?.body?.data) {
            content = Buffer.from(textPart.body.data, 'base64').toString('utf-8')
          }
        } else if (msg.payload?.body?.data) {
          content = Buffer.from(msg.payload.body.data, 'base64').toString('utf-8')
        }

        if (!content) content = '[Complex HTML Email - Cannot display in basic UI]'

        // Determine sender (if it's from 'me', it's 'user', else 'customer')
        const fromHeader = msg.payload?.headers?.find((h) => h.name?.toLowerCase() === 'from')?.value || ''
        const sender = fromHeader.includes(user.email ?? '') ? 'user' : 'customer'

        await supabase.from('messages').insert({
          conversation_id: conversationId,
          sender,
          content,
          source: 'gmail',
          external_message_id: msg.id,
        })
      }
    }

    return NextResponse.json({ success: true, synced_threads: syncedCount })
  } catch (error: any) {
    console.error('Gmail sync error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
