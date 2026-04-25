import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Sandesh AI account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-layout">
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb-1" />
        <div className="auth-bg-orb auth-bg-orb-2" />
        <div className="auth-bg-orb auth-bg-orb-3" />
      </div>
      <div className="auth-container">
        <div className="auth-logo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="url(#logo-gradient)" />
            <path d="M10 13h16M10 18h10M10 23h13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="27" cy="23" r="5" fill="url(#accent-gradient)" />
            <path d="M25.5 23l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logo-gradient" x1="0" y1="0" x2="36" y2="36">
                <stop stopColor="#7c3aed" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="accent-gradient" x1="22" y1="18" x2="32" y2="28">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#0891b2" />
              </linearGradient>
            </defs>
          </svg>
          <span>Sandesh AI</span>
        </div>
        {children}
      </div>
      <style>{`
        .auth-layout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
        }
        .auth-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .auth-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }
        .auth-bg-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #7c3aed, transparent);
          top: -100px; left: -100px;
        }
        .auth-bg-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #06b6d4, transparent);
          bottom: -50px; right: -50px;
        }
        .auth-bg-orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #4f46e5, transparent);
          top: 50%; left: 60%;
        }
        .auth-container {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
        }
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  )
}
