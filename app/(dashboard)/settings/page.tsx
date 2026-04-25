'use client'

import { useState, useEffect } from 'react'

interface UserData {
  email: string
  plan: string
  business_name: string | null
  services: string | null
  pricing_info: string | null
  tone: 'friendly' | 'professional' | 'sales'
  gmail_refresh_token: string | null
  replies_used?: number
}

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'persona' | 'integrations' | 'billing'>('persona')

  // Form state
  const [businessName, setBusinessName] = useState('')
  const [services, setServices] = useState('')
  const [pricingInfo, setPricingInfo] = useState('')
  const [tone, setTone] = useState<'friendly' | 'professional' | 'sales'>('professional')

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUserData(data.user)
        setBusinessName(data.user?.business_name ?? '')
        setServices(data.user?.services ?? '')
        setPricingInfo(data.user?.pricing_info ?? '')
        setTone(data.user?.tone ?? 'professional')
      }
      
      // Check for OAuth callbacks in URL
      const params = new URLSearchParams(window.location.search)
      if (params.get('gmail') === 'connected') {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 5000)
        // Clean URL
        window.history.replaceState({}, document.title, '/settings')
      }
      if (params.get('error')) {
        setError(`Integration error: ${params.get('error')}`)
        window.history.replaceState({}, document.title, '/settings')
      }
      
      setLoading(false)
    }
    load()
  }, [])

  const handleSavePersona = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    const res = await fetch('/api/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business_name: businessName, services, pricing_info: pricingInfo, tone }),
    })

    if (res.ok) {
      const data = await res.json()
      setUserData((prev) => ({ ...prev!, ...data.user }))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to save')
    }
    setSaving(false)
  }

  const handleConnectGmail = () => {
    window.location.href = '/api/auth/gmail'
  }

  const TABS = [
    { id: 'persona', label: 'AI Persona' },
    { id: 'billing', label: 'Billing & Plan' },
  ] as const

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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Settings</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Configure your AI assistant and integrations
        </p>
      </div>

      <div className="settings-layout">
        {/* Tab Nav */}
        <nav className="settings-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`settings-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="settings-content">
          
          {success && (
            <div className="alert alert-success fade-in" style={{ marginBottom: '1.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Changes saved successfully!
            </div>
          )}
          {error && (
            <div className="alert alert-error fade-in" style={{ marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          {/* AI Persona Tab */}
          {activeTab === 'persona' && (
            <div className="card fade-in">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Persona</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Teach the AI about your business so it can write better replies.
              </p>

              <form onSubmit={handleSavePersona} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="business-name">Business Name</label>
                  <input
                    id="business-name"
                    type="text"
                    className="form-input"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="services">Services / Products</label>
                  <textarea
                    id="services"
                    className="form-input form-textarea"
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="What do you sell? e.g. We provide B2B SaaS software for..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pricing">Pricing Information</label>
                  <textarea
                    id="pricing"
                    className="form-input form-textarea"
                    style={{ minHeight: '80px' }}
                    value={pricingInfo}
                    onChange={(e) => setPricingInfo(e.target.value)}
                    placeholder="e.g. Plans start at $29/mo."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tone">Tone of Voice</label>
                  <select
                    id="tone"
                    className="form-input"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                  >
                    <option value="professional">Professional & Helpful</option>
                    <option value="friendly">Friendly & Casual</option>
                    <option value="sales">Sales-oriented & Persuasive</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                  style={{ width: 'fit-content', marginTop: '0.5rem' }}
                  id="save-persona-btn"
                >
                  {saving ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Saving...</> : 'Save Persona'}
                </button>
              </form>
            </div>
          )}



          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="card fade-in">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Billing & Plan</h2>

              <div style={{ padding: '1.25rem', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Current Plan</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {userData?.plan?.toUpperCase() ?? 'FREE'}
                    <span className={`badge ${userData?.plan === 'free' ? 'badge-neutral' : 'badge-primary'}`} style={{ fontSize: '0.7rem' }}>
                      Active
                    </span>
                  </div>
                </div>
                
                <div style={{ height: 1, background: 'var(--color-border-strong)', margin: '1rem 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    AI Replies Used: <strong style={{ color: 'var(--color-text-primary)' }}>{userData?.replies_used ?? 0}</strong>
                  </div>
                  <a href="/pricing" className="btn btn-primary btn-sm">
                    Upgrade Plan
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .settings-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
        .settings-header { margin-bottom: 2rem; }
        .settings-layout { display: flex; gap: 1.5rem; align-items: flex-start; }
        .settings-nav { width: 200px; min-width: 160px; display: flex; flex-direction: column; gap: 4px; }
        @media (max-width: 768px) {
          .settings-layout { flex-direction: column; }
          .settings-nav { width: 100%; flex-direction: row; overflow-x: auto; padding-bottom: 0.5rem; }
        }
        .settings-nav-item { text-align: left; padding: 0.625rem 0.875rem; border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 500; color: var(--color-text-secondary); background: none; border: none; cursor: pointer; transition: all var(--transition-fast); white-space: nowrap; }
        .settings-nav-item:hover { background: var(--color-bg-elevated); color: var(--color-text-primary); }
        .settings-nav-item.active { background: var(--color-primary-dim); color: var(--color-primary-lighter); }
        .settings-content { flex: 1; width: 100%; }
      `}</style>
    </div>
  )
}
