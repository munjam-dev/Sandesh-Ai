import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="app-shell">
      <Sidebar user={user} dbUser={userData} />
      <main className="app-main">
        {children}
      </main>
      <style>{`
        .app-shell {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg);
        }
        .app-main {
          flex: 1;
          margin-left: var(--sidebar-width);
          min-height: 100vh;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .app-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}
