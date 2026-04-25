// ============================================================
// Sandesh AI — Database Types
// ============================================================

export type Plan = 'free' | 'starter' | 'growth'
export type Sender = 'user' | 'ai' | 'customer'
export type Tone = 'friendly' | 'professional' | 'sales'
export type LeadStatus = 'HOT' | 'WARM' | 'COLD'
export type ChannelSource = 'gmail' | 'whatsapp' | 'instagram'

// ---- Row shapes --------------------------------------------

export interface UserRow {
  id: string
  email: string
  plan: Plan
  replies_used: number
  created_at: string
  business_name: string | null
  services: string | null
  pricing_info: string | null
  tone: Tone
}

export interface IntegrationRow {
  id: string
  user_id: string
  provider: ChannelSource
  access_token: string | null
  refresh_token: string | null
  metadata: any | null
  created_at: string
  updated_at: string
}

export interface ConversationRow {
  id: string
  user_id: string
  title: string | null
  source: ChannelSource
  created_at: string
  external_thread_id: string | null
  lead_status: LeadStatus | null
  intent: string | null
}

export interface MessageRow {
  id: string
  conversation_id: string
  sender: Sender
  content: string
  source: ChannelSource
  created_at: string
  external_message_id: string | null
}

export interface UsageRow {
  id: string
  user_id: string
  replies_count: number
  updated_at: string
}

// ---- Inserts -----------------------------------------------

export interface IntegrationInsert {
  user_id: string
  provider: ChannelSource
  access_token?: string | null
  refresh_token?: string | null
  metadata?: any | null
}

export interface ConversationInsert {
  user_id: string
  title?: string | null
  source?: ChannelSource
  external_thread_id?: string | null
  lead_status?: LeadStatus | null
  intent?: string | null
}

export interface MessageInsert {
  conversation_id: string
  sender: Sender
  content: string
  source?: ChannelSource
  external_message_id?: string | null
}

// ---- Plan limits -------------------------------------------

export const PLAN_LIMITS: Record<Plan, number | null> = {
  free: 100,
  starter: 1000,
  growth: 5000,
}

export function getRemainingReplies(user: UserRow): number | null {
  const limit = PLAN_LIMITS[user.plan]
  if (limit === null) return null
  return Math.max(0, limit - user.replies_used)
}

// ---- Database type -----------------------------------------

export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow
        Insert: Omit<UserRow, 'created_at' | 'tone'> & { created_at?: string; tone?: Tone }
        Update: Partial<Omit<UserRow, 'id'>>
      }
      integrations: {
        Row: IntegrationRow
        Insert: IntegrationInsert & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Omit<IntegrationRow, 'id' | 'user_id' | 'provider'>>
      }
      conversations: {
        Row: ConversationRow
        Insert: ConversationInsert & { id?: string; created_at?: string }
        Update: Partial<Omit<ConversationRow, 'id' | 'user_id'>>
      }
      messages: {
        Row: MessageRow
        Insert: MessageInsert & { id?: string; created_at?: string }
        Update: Partial<Pick<MessageRow, 'content'>>
      }
      usage: {
        Row: UsageRow
        Insert: { user_id: string; replies_count?: number; updated_at?: string }
        Update: { replies_count?: number; updated_at?: string }
      }
    }
  }
}
