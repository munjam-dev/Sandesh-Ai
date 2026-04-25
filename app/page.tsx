'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, Zap, Inbox, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -200])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="landing-layout">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.05), transparent 40%)`
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                <path d="M6 10h24M6 18h16M6 26h20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="29" cy="26" r="6" fill="#06b6d4"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">Sandesh AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <div className="w-px h-4 bg-gray-800" />
            <Link href="/login" className="text-sm font-medium hover:text-purple-400 transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] -z-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8">
              <Zap size={14} className="text-purple-400" />
              Introducing Connected Channels
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Never Miss a <br />
              <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Lead Again
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              AI replies instantly across Email, WhatsApp, and Instagram. 
              Automatically classify intents, score leads, and unified your inbox into a single powerful dashboard.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/signup" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="#demo" className="flex items-center gap-2 bg-[#1a1a1a] text-white border border-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                View Demo
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<MessageSquare className="text-cyan-400" />}
              title="AI Smart Replies"
              description="Context-aware AI generates perfect, human-like responses based on your business persona and past messages."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Inbox className="text-purple-400" />}
              title="Unified Inbox"
              description="Connect Gmail, WhatsApp Business, and Instagram Direct. Manage all your customer communications from one central hub."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-400" />}
              title="Lead Qualification"
              description="Our models instantly classify incoming messages, detecting intent and assigning HOT, WARM, or COLD lead scores."
              delay={0.3}
            />
          </div>
        </section>

        {/* Demo UI Preview Section */}
        <section id="demo" className="max-w-5xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-gray-800 bg-[#0a0a0a] overflow-hidden shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 right-0 h-12 bg-[#111] border-b border-gray-800 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs text-gray-500 font-medium">app.sandesh.ai</div>
            </div>
            <div className="pt-12 p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 w-4/5">
                  <p className="text-sm text-gray-300">Hi, I'm interested in the Growth plan. Can we jump on a call tomorrow?</p>
                  <p className="text-xs text-gray-500 mt-2">Received via WhatsApp • 2 mins ago</p>
                </div>
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-4 ml-auto w-4/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">✨ AI Suggested Reply</span>
                  </div>
                  <p className="text-sm text-purple-100">Absolutely! I'd be happy to discuss the Growth plan with you. How does 2 PM EST sound for a quick call?</p>
                </div>
              </div>
              <div className="w-64 bg-[#111] border border-gray-800 rounded-xl p-5 h-fit">
                <h4 className="text-sm font-semibold mb-4 text-gray-300">Lead Analysis</h4>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Intent</div>
                    <div className="text-sm font-medium">Meeting Request</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Lead Score</div>
                    <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold tracking-wider">HOT LEAD</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Pricing Section (simplified for marketing) */}
      <section id="pricing" className="py-32 border-t border-gray-900 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400">Upgrade as your volume grows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Free', 'Starter', 'Growth'].map((plan, i) => (
              <div key={plan} className={`p-8 rounded-2xl border ${i === 1 ? 'border-purple-500 bg-purple-500/5 relative' : 'border-gray-800 bg-[#0a0a0a]'}`}>
                {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-xl font-bold mb-2">{plan}</h3>
                <div className="text-3xl font-bold mb-6">
                  {i === 0 ? '$0' : i === 1 ? '₹2,900' : '₹9,900'}
                  <span className="text-sm text-gray-500 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {[1,2,3].map(j => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                      <CheckCircle2 size={16} className={i === 1 ? 'text-purple-400' : 'text-gray-600'} /> Feature included
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`block text-center w-full py-3 rounded-lg font-medium transition-colors ${i === 1 ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-[#1a1a1a] text-white hover:bg-gray-800'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-12 text-center text-gray-500 text-sm">
        <p>© 2026 Sandesh AI. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        body {
          background-color: #000;
          color: #fff;
        }
        .landing-layout {
          min-height: 100vh;
          font-family: var(--font-inter), sans-serif;
        }
        .glass-nav {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  )
}

function FeatureCard({ title, description, icon, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-[#0a0a0a] border border-gray-800 hover:border-gray-700 transition-colors group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-gray-800 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
