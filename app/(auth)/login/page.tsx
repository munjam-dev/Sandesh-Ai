'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [magicEmail, setMagicEmail] = useState('')
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)
  const [error, setError] = useState('')

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email: magicEmail,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div className="card-glass fade-in" style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Welcome back
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Sign in to your Sandesh AI workspace
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', padding: '4px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
        <button
          className={`btn ${mode === 'password' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
          onClick={() => setMode('password')}
        >
          Password
        </button>
        <button
          className={`btn ${mode === 'magic' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
          onClick={() => setMode('magic')}
        >
          Magic Link
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          {error}
        </div>
      )}

      {mode === 'password' ? (
        <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setMode('magic')}
              style={{ color: 'var(--color-primary-lighter)', padding: '0.25rem 0' }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
            id="login-submit"
          >
            {loading ? <span className="spinner" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {magicSent ? (
            <div className="alert alert-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/></svg>
              Magic link sent! Check your email inbox.
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="magic-email">Email address</label>
                <input
                  id="magic-email"
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                  value={magicEmail}
                  onChange={(e) => setMagicEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
                style={{ width: '100%' }}
                id="magic-link-submit"
              >
                {loading ? <span className="spinner" /> : null}
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </>
          )}
        </form>
      )}

      <div className="divider-text" style={{ margin: '1.5rem 0' }}>or</div>

      <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" style={{ color: 'var(--color-primary-lighter)', fontWeight: 500 }}>
          Create one free
        </Link>
      </p>
    </div>
  )
}
