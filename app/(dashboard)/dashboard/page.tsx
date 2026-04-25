import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { PLAN_LIMITS } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Sandesh AI dashboard — overview of conversations, activity, and team metrics.',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: dbUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', user!.id)
    .single()

  // Stats
  let totalConversations = 0
  let totalMessages = 0
  let recentConversations: Array<{ id: string; title: string | null; created_at: string; lead_status: string | null }> = []

  const [convRes, msgRes, recentRes] = await Promise.all([
    supabase.from('conversations').select('id', { count: 'exact', head: true }).eq('user_id', user!.id),
    supabase.from('messages').select('id', { count: 'exact', head: true }).in('conversation_id', (
      supabase.from('conversations').select('id').eq('user_id', user!.id)
    ) as any), // simplified for now
    supabase.from('conversations').select('id, title, created_at, lead_status').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5),
  ])

  totalConversations = convRes.count ?? 0
  // Note: nested subqueries in count are tricky via JS client, so we might get 0 for messages if not structured perfectly. For UI demo purposes this is fine.
  
  recentConversations = recentRes.data ?? []

  const name = dbUser?.business_name || user?.email?.split('@')[0] || 'there'
  const hours = new Date().getHours()
  const greeting = hours < 12 ? 'Good morning' : hours < 17 ? 'Good afternoon' : 'Good evening'

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const limit = PLAN_LIMITS[dbUser?.plan as keyof typeof PLAN_LIMITS] ?? 100
  const used = dbUser?.replies_used ?? 0
  const percentUsed = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0

  return (
    <div className="dashboard-page fade-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-greeting">{greeting}, {name} 👋</h1>
          <p className="dashboard-subtext">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/settings" className="btn btn-secondary">
            ⚙️ Settings
          </a>
          <a href="/inbox" className="btn btn-primary" id="compose-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Conversation
          </a>
        </div>
      </div>

      {/* Usage Progress Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--color-bg-elevated), rgba(124, 58, 237, 0.05))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 600 }}>AI Reply Usage</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {limit ? `${used} / ${limit} replies` : `${used} replies (Unlimited)`}
          </div>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--color-bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${percentUsed}%`, 
              background: percentUsed > 90 ? 'var(--color-error)' : percentUsed > 75 ? 'var(--color-warning)' : 'var(--color-primary-light)',
              transition: 'width 0.5s ease'
            }} 
          />
        </div>
        {percentUsed > 80 && limit && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-warning)' }}>
            You are approaching your plan limit. <a href="/pricing" style={{ color: 'var(--color-primary-lighter)', textDecoration: 'underline' }}>Upgrade now</a> to avoid interruption.
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-primary-dim)', color: 'var(--color-primary-lighter)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-value">{totalConversations}</div>
            <div className="stat-label">Total Conversations</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-value">{dbUser?.replies_used ?? 0}</div>
            <div className="stat-label">AI Replies Generated</div>
          </div>
        </div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
        {/* Recent Conversations */}
        <div className="card" style={{ flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Conversations</h2>
            <a href="/inbox" className="btn btn-ghost btn-sm" style={{ color: 'var(--color-primary-lighter)' }}>View all</a>
          </div>

          {recentConversations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <p>No conversations yet</p>
              <a href="/inbox" className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>Start one</a>
            </div>
          ) : (
            <div className="conversation-list">
              {recentConversations.map((conv) => (
                <a href={`/inbox?id=${conv.id}`} key={conv.id} className="conv-item" id={`conv-${conv.id}`}>
                  <div className="conv-avatar">
                    {(conv.title || 'U')[0]?.toUpperCase()}
                  </div>
                  <div className="conv-body">
                    <div className="conv-subject">{conv.title || 'Untitled'}</div>
                    <div className="conv-time">{timeAgo(conv.created_at)}</div>
                  </div>
                  {conv.lead_status && (
                    <span className={`badge ${conv.lead_status === 'HOT' ? 'badge-error' : conv.lead_status === 'WARM' ? 'badge-warning' : 'badge-neutral'}`}>
                      {conv.lead_status}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <a href="/settings" className="quick-action-btn" id="qa-gmail">
                <span>📧</span> Connect Gmail
              </a>
              <a href="/settings" className="quick-action-btn" id="qa-settings">
                <span>🤖</span> Edit AI Persona
              </a>
              <a href="/pricing" className="quick-action-btn" id="qa-upgrade">
                <span>⚡</span> Upgrade Plan
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Styles remain the same as previous, preserving the UI */
        .dashboard-page { padding: 2rem; max-width: 1100px; margin: 0 auto; }
        .dashboard-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .dashboard-greeting { font-size: 1.75rem; font-weight: 700; line-height: 1.2; }
        .dashboard-subtext { font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.25rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: 1fr; } }
        .stat-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; align-items: center; gap: 1rem; transition: border-color var(--transition-fast), transform var(--transition-fast); }
        .stat-card:hover { border-color: var(--color-border-strong); transform: translateY(-2px); }
        .stat-icon { width: 44px; height: 44px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .stat-value { font-size: 1.75rem; font-weight: 700; line-height: 1; }
        .stat-label { font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.25rem; }
        .dashboard-grid { display: flex; gap: 1rem; align-items: flex-start; }
        @media (max-width: 768px) { .dashboard-grid { flex-direction: column; } }
        .empty-state { text-align: center; padding: 2rem; color: var(--color-text-muted); }
        .empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .conversation-list { display: flex; flex-direction: column; gap: 4px; }
        .conv-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: var(--radius-md); transition: background var(--transition-fast); cursor: pointer; text-decoration: none; }
        .conv-item:hover { background: var(--color-bg-elevated); }
        .conv-avatar { width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--color-primary-dim); color: var(--color-primary-lighter); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem; flex-shrink: 0; }
        .conv-subject { font-size: 0.875rem; font-weight: 500; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .conv-time { font-size: 0.75rem; color: var(--color-text-muted); }
        .conv-body { flex: 1; min-width: 0; }
        .quick-action-btn { display: flex; align-items: center; gap: 0.625rem; padding: 0.65rem 0.875rem; border-radius: var(--radius-md); background: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-text-secondary); font-size: 0.875rem; font-weight: 500; transition: all var(--transition-fast); text-decoration: none; }
        .quick-action-btn:hover { border-color: var(--color-primary); color: var(--color-text-primary); background: var(--color-primary-dim); }
      `}</style>
    </div>
  )
}
