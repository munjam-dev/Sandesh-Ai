'use client'

import { useState, useEffect, useRef } from 'react'

interface Conversation {
  id: string
  subject: string | null
  created_at: string
  lead_status: string | null
  intent: string | null
  source: 'gmail' | 'whatsapp' | 'instagram'
  external_thread_id: string | null
}

interface Message {
  id: string
  conversation_id: string
  sender: 'user' | 'ai' | 'customer'
  content: string
  source: 'gmail' | 'whatsapp' | 'instagram'
  created_at: string
}

function SourceIcon({ source, size = 16 }: { source: string, size?: number }) {
  if (source === 'whatsapp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    )
  }
  if (source === 'instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  }
  // Default Gmail
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
    </svg>
  )
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [composing, setComposing] = useState(false)
  const [error, setError] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchConversations = async () => {
    const res = await fetch('/api/conversations')
    if (res.ok) {
      const data = await res.json()
      setConversations(data.conversations ?? [])
    }
    setLoading(false)
  }

  const fetchMessages = async (convId: string) => {
    const res = await fetch(`/api/messages?conversation_id=${convId}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages ?? [])
    }
  }

  useEffect(() => {
    fetchConversations()
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    if (id) setSelectedId(id)
  }, [])

  useEffect(() => {
    if (selectedId) fetchMessages(selectedId)
  }, [selectedId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent, senderType: 'user' | 'ai' = 'user') => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedId) return
    setSending(true)
    setError('')

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation_id: selectedId, content: newMessage, sender: senderType }),
    })

    if (res.ok) {
      const data = await res.json()
      setMessages((prev) => [...prev, data.message])
      setNewMessage('')
      fetchConversations()
    } else {
      const data = await res.json()
      if (data.error === 'LimitReached') {
        setError('You have reached your plan limit for AI replies. Please upgrade to continue.')
      } else {
        setError(data.error ?? 'Failed to send message')
      }
    }
    setSending(false)
  }

  const handleSuggestReply = async () => {
    if (!selectedId) return
    setAiLoading(true)
    setError('')

    const res = await fetch('/api/ai/suggest-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation_id: selectedId }),
    })

    const data = await res.json()
    if (res.ok) {
      setNewMessage(data.suggestion)
      
      // Update the selected conversation in the UI with the new AI-generated intent and lead status
      if (data.intent || data.lead_status) {
        setConversations(prev => prev.map(conv => {
          if (conv.id === selectedId) {
            return {
              ...conv,
              intent: data.intent || conv.intent,
              lead_status: data.lead_status || conv.lead_status
            }
          }
          return conv
        }))
      }
    } else {
      if (data.error === 'LimitReached') {
        setError('You have reached your plan limit for AI replies. Please upgrade to continue.')
      } else {
        setError(data.error ?? 'AI generation failed')
      }
    }
    setAiLoading(false)
  }

  const handleSyncGmail = async () => {
    setSyncing(true)
    setError('')
    const res = await fetch('/api/gmail/sync', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      await fetchConversations()
      alert(`Synced ${data.synced_threads} new threads from Gmail.`)
    } else {
      setError(data.error ?? 'Failed to sync Gmail')
    }
    setSyncing(false)
  }

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubject.trim()) return
    setComposing(true)

    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newSubject }),
    })

    if (res.ok) {
      const data = await res.json()
      setConversations((prev) => [data.conversation, ...prev])
      setSelectedId(data.conversation.id)
      setNewSubject('')
      setShowCompose(false)
    }
    setComposing(false)
  }

  const selectedConv = conversations.find((c) => c.id === selectedId)

  return (
    <div className="inbox-shell">
      {/* Sidebar */}
      <div className="inbox-sidebar">
        <div className="inbox-sidebar-header">
          <h1 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Inbox</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={handleSyncGmail} disabled={syncing} title="Sync Gmail">
              {syncing ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : '🔄'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCompose(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>

        {showCompose && (
          <form onSubmit={handleCreateConversation} className="compose-form slide-in">
            <input
              type="text"
              className="form-input"
              placeholder="Conversation title..."
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              required
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary btn-sm" style={{ flex: 1 }} disabled={composing}>
                {composing ? 'Creating...' : 'Create'}
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowCompose(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="conv-list">
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : conversations.length === 0 ? (
            <div className="inbox-empty">
              <div style={{ fontSize: '2rem' }}>📭</div>
              <p>No conversations yet</p>
              <button className="btn btn-primary btn-sm" onClick={() => setShowCompose(true)} style={{ marginTop: '0.5rem' }}>Start one</button>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                className={`conv-row ${selectedId === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedId(conv.id)}
              >
                <div className="conv-row-avatar">
                  {(conv.title || 'U')[0]?.toUpperCase()}
                </div>
                <div className="conv-row-body">
                  <div className="conv-row-subject">
                    <span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '6px' }}>
                      <SourceIcon source={conv.source || 'gmail'} size={14} />
                    </span>
                    {conv.title || 'Untitled Conversation'}
                  </div>
                  <div className="conv-row-meta">
                    {conv.lead_status && (
                      <span className={`badge badge-sm ${conv.lead_status === 'HOT' ? 'badge-error' : conv.lead_status === 'WARM' ? 'badge-warning' : 'badge-neutral'}`}>
                        {conv.lead_status}
                      </span>
                    )}
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                      {timeAgo(conv.created_at)}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Thread */}
      <div className="inbox-thread">
        {!selectedId ? (
          <div className="thread-empty fade-in">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✉️</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Select a conversation</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Pick a thread from the left or create a new one.</p>
          </div>
        ) : (
          <>
            <div className="thread-header">
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SourceIcon source={selectedConv?.source || 'gmail'} size={18} />
                  {selectedConv?.title || 'Untitled'}
                </div>
                {selectedConv?.intent && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                    Intent: {selectedConv.intent}
                  </div>
                )}
              </div>
              {selectedConv?.lead_status && (
                <span className={`badge ${selectedConv.lead_status === 'HOT' ? 'badge-error' : selectedConv.lead_status === 'WARM' ? 'badge-warning' : 'badge-neutral'}`}>
                  {selectedConv.lead_status} LEAD
                </span>
              )}
            </div>

            <div className="thread-messages">
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  No messages yet. Start the conversation below.
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.sender === 'user' || msg.sender === 'ai'
                  return (
                    <div key={msg.id} className={`message-item slide-in ${isUser ? 'message-out' : 'message-in'}`}>
                      {!isUser && (
                        <div className="avatar avatar-sm" style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-primary)' }}>
                          C
                        </div>
                      )}
                      <div className="message-bubble-wrapper">
                        <div className="message-meta-small">
                          {msg.sender === 'ai' ? '🤖 AI Reply' : msg.sender === 'user' ? 'You' : 'Customer'} • {timeAgo(msg.created_at)}
                        </div>
                        <div className={`message-bubble ${isUser ? 'bubble-primary' : 'bubble-secondary'}`}>
                          {msg.content.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                          ))}
                        </div>
                      </div>
                      {isUser && (
                        <div className="avatar avatar-sm" style={{ background: msg.sender === 'ai' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                          {msg.sender === 'ai' ? 'AI' : 'U'}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="alert alert-error" style={{ margin: '0 1.5rem 1rem' }}>
                {error}
                {error.includes('limit') && <a href="/pricing" style={{ marginLeft: '1rem', textDecoration: 'underline' }}>Upgrade</a>}
              </div>
            )}

            <div className="message-input-area">
              <textarea
                className="form-input form-textarea"
                placeholder="Type a message or use AI Suggest..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending}
                style={{ flex: 1, minHeight: '60px', height: '60px', borderRadius: 'var(--radius-md)', resize: 'none' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn"
                  onClick={handleSuggestReply}
                  disabled={aiLoading || messages.length === 0}
                  style={{ background: 'linear-gradient(135deg, var(--color-primary-dim), rgba(6,182,212,0.15))', color: 'var(--color-primary-lighter)', border: '1px solid var(--color-border-strong)', padding: '0.5rem 1rem' }}
                >
                  {aiLoading ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : '✨ Suggest Reply'}
                </button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleSend(e, 'user')}
                    disabled={sending || !newMessage.trim()}
                    style={{ flex: 1 }}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e) => handleSend(e, 'ai')}
                    disabled={sending || !newMessage.trim()}
                    title="Send & count as AI reply"
                  >
                    Send as AI
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .inbox-shell { display: flex; height: 100vh; overflow: hidden; background: var(--color-bg); }
        .inbox-sidebar { width: 320px; min-width: 320px; border-right: 1px solid var(--color-border); display: flex; flex-direction: column; background: var(--color-bg-secondary); overflow: hidden; }
        .inbox-sidebar-header { padding: 1.25rem 1.25rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; }
        .compose-form { padding: 1rem; border-bottom: 1px solid var(--color-border); background: var(--color-bg-elevated); }
        .conv-list { flex: 1; overflow-y: auto; padding: 0.5rem; }
        .inbox-empty { text-align: center; padding: 3rem 1rem; color: var(--color-text-muted); font-size: 0.875rem; }
        .conv-row { width: 100%; display: flex; align-items: center; gap: 0.875rem; padding: 0.875rem; border-radius: var(--radius-md); border: none; background: none; cursor: pointer; text-align: left; transition: background var(--transition-fast); color: var(--color-text-primary); margin-bottom: 2px; }
        .conv-row:hover { background: var(--color-bg-elevated); }
        .conv-row.active { background: var(--color-primary-dim); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius-md) var(--radius-md) 0; }
        .conv-row-avatar { width: 40px; height: 40px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--color-bg-card), var(--color-bg-elevated)); border: 1px solid var(--color-border-strong); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1rem; flex-shrink: 0; }
        .conv-row.active .conv-row-avatar { background: var(--color-primary); color: white; border-color: var(--color-primary-light); }
        .conv-row-body { flex: 1; min-width: 0; }
        .conv-row-subject { font-size: 0.9rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.25rem; }
        .conv-row-meta { display: flex; align-items: center; justify-content: space-between; }
        .inbox-thread { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
        .thread-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--color-text-secondary); background: var(--color-bg); }
        .thread-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between; background: rgba(13, 17, 32, 0.8); backdrop-filter: blur(12px); z-index: 10; }
        .thread-messages { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        
        /* Chat Bubbles */
        .message-item { display: flex; gap: 0.75rem; align-items: flex-end; max-width: 85%; }
        .message-in { align-self: flex-start; }
        .message-out { align-self: flex-end; flex-direction: row; }
        .message-bubble-wrapper { display: flex; flex-direction: column; gap: 0.25rem; }
        .message-out .message-bubble-wrapper { align-items: flex-end; }
        .message-meta-small { font-size: 0.7rem; color: var(--color-text-muted); margin: 0 4px; }
        
        .message-bubble { padding: 0.875rem 1.125rem; font-size: 0.95rem; line-height: 1.5; border-radius: 1.25rem; box-shadow: var(--shadow-sm); }
        .bubble-primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: white; border-bottom-right-radius: 0.25rem; }
        .bubble-secondary { background: var(--color-bg-elevated); border: 1px solid var(--color-border-strong); color: var(--color-text-primary); border-bottom-left-radius: 0.25rem; }
        
        .message-input-area { padding: 1.25rem 1.5rem; border-top: 1px solid var(--color-border); display: flex; gap: 1rem; align-items: flex-end; background: var(--color-bg-secondary); }
      `}</style>
    </div>
  )
}
