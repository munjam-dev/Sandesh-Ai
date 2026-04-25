'use client'

import { useState, useEffect } from 'react'

interface Integration {
  id: string
  provider: 'gmail' | 'whatsapp' | 'instagram'
  created_at: string
}

export default function ChannelsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIntegrations = async () => {
      const res = await fetch('/api/integrations')
      if (res.ok) {
        const data = await res.json()
        setIntegrations(data.integrations || [])
      }
      setLoading(false)
    }
    fetchIntegrations()
  }, [])

  const hasIntegration = (provider: string) => integrations.some(i => i.provider === provider)

  const handleConnectGmail = () => {
    window.location.href = '/api/auth/gmail'
  }

  const handleConnectWhatsApp = async () => {
    try {
      const res = await fetch('/api/integrations/whatsapp', { method: 'POST' })
      if (res.ok) {
        alert('WhatsApp connected successfully!')
        window.location.reload()
      } else {
        const data = await res.json()
        alert('Failed to connect: ' + data.error)
      }
    } catch (err) {
      alert('Error connecting WhatsApp')
    }
  }

  const handleConnectPlaceholder = (platform: string) => {
    alert(`${platform} integration coming soon!`)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="settings-page fade-in">
      <div className="settings-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Connected Channels</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Connect your communication channels to sync messages into your unified inbox.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>Gmail</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Sync your emails directly into Sandesh AI.</p>
            </div>
          </div>
          
          {hasIntegration('gmail') ? (
            <span className="badge badge-success" style={{ padding: '0.4rem 0.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', marginRight: 6 }}></span>
              Connected
            </span>
          ) : (
            <button className="btn btn-secondary" onClick={handleConnectGmail}>
              Connect
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, background: '#25D366', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>WhatsApp Business</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Connect via Meta WhatsApp Cloud API.</p>
            </div>
          </div>
          
          {hasIntegration('whatsapp') ? (
            <span className="badge badge-success" style={{ padding: '0.4rem 0.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', marginRight: 6 }}></span>
              Connected
            </span>
          ) : (
            <button className="btn btn-secondary" onClick={handleConnectWhatsApp}>
              Connect Dev Keys
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>Instagram Direct</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Connect via Meta Graph API.</p>
            </div>
          </div>
          
          {hasIntegration('instagram') ? (
            <span className="badge badge-success" style={{ padding: '0.4rem 0.75rem' }}>Connected</span>
          ) : (
            <button className="btn btn-secondary" onClick={() => handleConnectPlaceholder('Instagram')}>
              Connect
            </button>
          )}
        </div>
      </div>

      <style>{`
        .settings-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
        .settings-header { margin-bottom: 2rem; }
      `}</style>
    </div>
  )
}
