'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    workspaceName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { data, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          workspace_name: formData.workspaceName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="card-glass fade-in" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
        <h2 style={{ marginBottom: '0.5rem' }}>Check your email</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          We sent a confirmation link to <strong>{formData.email}</strong>. Click it to activate your account.
        </p>
        <Link href="/login" className="btn btn-secondary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="card-glass fade-in" style={{ padding: '2.5rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Create your account
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="Sandesh Kumar"
              value={formData.fullName}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="workspaceName">Workspace name</label>
            <input
              id="workspaceName"
              name="workspaceName"
              type="text"
              className="form-input"
              placeholder="Acme Inc."
              value={formData.workspaceName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">Work email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            name="password"
            type="password"
            className="form-input"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form-input"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loading}
          style={{ width: '100%', marginTop: '0.5rem' }}
          id="signup-submit"
        >
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>

      <div className="divider-text" style={{ margin: '1.5rem 0' }}>already have an account?</div>

      <Link href="/login" className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
        Sign In Instead
      </Link>
    </div>
  )
}
