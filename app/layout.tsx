import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sandesh AI — Intelligent Team Communication',
    template: '%s | Sandesh AI',
  },
  description: 'Sandesh AI is a next-generation AI-powered team inbox and communication platform. Manage conversations, collaborate smarter, and close more with AI.',
  keywords: ['team inbox', 'AI messaging', 'SaaS communication', 'Sandesh AI'],
  openGraph: {
    title: 'Sandesh AI — Intelligent Team Communication',
    description: 'AI-powered team inbox for modern teams',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
