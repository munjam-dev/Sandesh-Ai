'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface SidebarProps {
  user: User
  dbUser: {
    email: string
    plan: string
    business_name: string | null
  } | null
}

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: '/inbox',
    label: 'Inbox',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
      </svg>
    ),
  },
  {
    href: '/campaigns',
    label: 'Campaigns',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    href: '/pricing',
    label: 'Pricing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
      </svg>
    ),
  },
  {
    href: '/settings/channels',
    label: 'Channels',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
  },
]

export default function Sidebar({ user, dbUser }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const name = dbUser?.business_name || user.email?.split('@')[0] || 'User'
  const initials = name.slice(0, 2).toUpperCase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/" className="flex items-center gap-3 w-full group">
          <div className="p-1 rounded-xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-all group-hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] flex-shrink-0">
            <img src="/logo-icon.png" alt="Icon" className="w-8 h-8 group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="sidebar-logo-name">Sandesh AI</div>
            <div className="sidebar-workspace">{dbUser?.business_name ?? 'My Workspace'}</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              id={`nav-${item.label.toLowerCase()}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-label">{item.label}</span>
              {isActive && <span className="sidebar-nav-active-dot" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: Plan + User */}
      <div className="sidebar-footer">
        <div className="sidebar-plan-badge">
          <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
            {dbUser?.plan?.toUpperCase() ?? 'FREE'}
          </span>
          <Link href="/pricing" className="sidebar-upgrade" id="upgrade-plan-link">
            Upgrade
          </Link>
        </div>

        <div className="sidebar-user">
          <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
            {initials}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{name}</div>
            <div className="sidebar-user-email">{user.email}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-ghost btn-sm sidebar-signout"
            id="signout-btn"
            title="Sign out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow: hidden;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1.25rem 1.25rem 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        .sidebar-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--color-primary), #4f46e5);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-glow-sm);
        }
        .sidebar-logo-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.2;
        }
        .sidebar-workspace {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }
        .sidebar-nav {
          flex: 1;
          padding: 0.75rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.65rem 0.875rem;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          position: relative;
          text-decoration: none;
        }
        .sidebar-nav-item:hover {
          background: var(--color-bg-elevated);
          color: var(--color-text-primary);
        }
        .sidebar-nav-item.active {
          background: var(--color-primary-dim);
          color: var(--color-primary-lighter);
        }
        .sidebar-nav-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sidebar-nav-active-dot {
          position: absolute;
          right: 0.875rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-primary-lighter);
        }
        .sidebar-footer {
          padding: 0.75rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .sidebar-plan-badge {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.25rem;
        }
        .sidebar-upgrade {
          font-size: 0.75rem;
          color: var(--color-primary-lighter);
          font-weight: 500;
          transition: opacity var(--transition-fast);
        }
        .sidebar-upgrade:hover { opacity: 0.8; }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          background: var(--color-bg-elevated);
        }
        .sidebar-user-info {
          flex: 1;
          min-width: 0;
        }
        .sidebar-user-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-user-email {
          font-size: 0.68rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-signout {
          padding: 4px;
          color: var(--color-text-muted);
          flex-shrink: 0;
        }
        .sidebar-signout:hover { color: var(--color-error); }
      `}</style>
    </aside>
  )
}
