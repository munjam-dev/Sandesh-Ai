import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIResponse {
  reply: string
  intent: string
  lead_score: 'HOT' | 'WARM' | 'COLD'
}

export interface BusinessSettings {
  business_name?: string | null
  services?: string | null
  pricing_info?: string | null
  tone?: string | null
}

export interface MessageContext {
  sender: string
  content: string
}

/**
 * Generates an AI response based on conversation context and business settings.
 * Ensures the output is strictly formatted as JSON.
 */
export async function generateAIResponse(
  messages: MessageContext[],
  settings: BusinessSettings
): Promise<AIResponse> {
  const personaContext = `
    You are an AI sales assistant replying on behalf of a user.
    Business Name: ${settings.business_name || 'N/A'}
    Services: ${settings.services || 'N/A'}
    Pricing Info: ${settings.pricing_info || 'N/A'}
    Tone: ${settings.tone || 'professional'}
    
    Instructions:
    Analyze the conversation context and the latest customer message.
    1. Generate a concise, natural, human-like response adopting the specified tone. Do NOT include placeholders like [Your Name].
    2. Determine the user's intent (e.g., "Pricing Inquiry", "Support Request", "Spam", "Meeting Request").
    3. Determine the lead status: HOT (ready to buy/urgent), WARM (interested/asking questions), COLD (uninterested/spam/unrelated).

    Return ONLY JSON in this exact format:
    {
      "reply": "...",
      "intent": "...",
      "lead_score": "HOT" | "WARM" | "COLD"
    }
  `

  const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: personaContext },
  ]

  // Add conversation history
  messages.forEach((msg) => {
    chatMessages.push({
      role: msg.sender === 'customer' ? 'user' : 'assistant',
      content: msg.content,
    })
  })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 300,
    })

    const resultStr = completion.choices[0]?.message?.content || '{}'
    const parsed = JSON.parse(resultStr)

    return {
      reply: parsed.reply || 'I apologize, I could not generate a reply at this time.',
      intent: parsed.intent || 'Unknown',
      lead_score: ['HOT', 'WARM', 'COLD'].includes(parsed.lead_score) ? parsed.lead_score : 'WARM',
    }
  } catch (err) {
    console.error('OpenAI Error in generateAIResponse:', err)
    return {
      reply: 'I apologize, I could not generate a reply at this time due to an error.',
      intent: 'Unknown',
      lead_score: 'WARM',
    }
  }
}
