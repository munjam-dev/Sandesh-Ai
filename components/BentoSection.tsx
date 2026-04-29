'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Zap, BarChart3, Users, Shield, Inbox, Bot, Clock } from 'lucide-react'

const CARDS = [
  {
    id: 'ai',
    size: 'large',
    icon: <Bot size={28} />,
    title: 'AI Smart Replies',
    desc: 'Context-aware responses generated instantly. Understands intent, tone, and urgency — so your replies feel human, not robotic.',
    gradient: 'from-blue-600/20 via-blue-900/10 to-transparent',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    id: 'inbox',
    size: 'medium',
    icon: <Inbox size={24} />,
    title: 'Unified Inbox',
    desc: 'All channels in one place. WhatsApp, Email, Instagram — managed from a single dashboard.',
    gradient: 'from-cyan-600/20 via-cyan-900/10 to-transparent',
    borderColor: 'group-hover:border-cyan-500/50'
  },
  {
    id: 'leads',
    size: 'medium',
    icon: <Users size={24} />,
    title: 'Lead Qualification',
    desc: 'Automatically tag leads as HOT, WARM, or COLD based on intent signals.',
    gradient: 'from-purple-600/20 via-purple-900/10 to-transparent',
    borderColor: 'group-hover:border-purple-500/50'
  },
  {
    id: 'automation',
    size: 'small',
    icon: <Zap size={24} />,
    title: 'Automation',
    desc: '24/7 workflows that run without you. Follow-ups, broadcasts, and sequences — automated.',
    gradient: 'from-orange-600/20 via-orange-900/10 to-transparent',
    borderColor: 'group-hover:border-orange-500/50'
  },
  {
    id: 'analytics',
    size: 'small',
    icon: <BarChart3 size={24} />,
    title: 'Analytics',
    desc: 'Track reply rates, conversions, and team performance. Know what\'s working.',
    gradient: 'from-emerald-600/20 via-emerald-900/10 to-transparent',
    borderColor: 'group-hover:border-emerald-500/50'
  },
  {
    id: 'response',
    size: 'small',
    icon: <Clock size={24} />,
    title: 'Instant',
    desc: 'Respond in under 1 second. Even at 3AM. Never miss a message.',
    gradient: 'from-red-600/20 via-red-900/10 to-transparent',
    borderColor: 'group-hover:border-red-500/50'
  },
  {
    id: 'security',
    size: 'small',
    icon: <Shield size={24} />,
    title: 'Security',
    desc: 'End-to-end encryption, SOC2 compliant, GDPR ready.',
    gradient: 'from-indigo-600/20 via-indigo-900/10 to-transparent',
    borderColor: 'group-hover:border-indigo-500/50'
  },
]

export default function BentoSection() {
  return (
    <section className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4 block">Features</span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            The complete AI messaging platform
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Every tool you need to convert conversations into customers — wrapped in a textured, high-end interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          {/* AI Card - Large */}
          <motion.div
            whileHover={{ y: -5 }}
            className="lg:col-span-2 lg:row-span-2 relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-end group transition-all duration-500 overflow-hidden"
          >
            {/* Texture & Gradient Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Bot size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">AI Smart Replies</h3>
              <p className="text-white/60 leading-relaxed text-lg max-w-md">
                Context-aware responses generated instantly. Understands intent, tone, and urgency — so your replies feel human, not robotic.
              </p>
            </div>
          </motion.div>

          {/* Other Cards */}
          {CARDS.slice(1).map((card, i) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-end group transition-all duration-500 overflow-hidden ${card.size === 'medium' ? 'lg:col-span-2' : ''}`}
            >
              {/* Texture & Gradient Overlay */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              
              {/* Border Glow on Hover */}
              <div className={`absolute inset-0 border border-transparent transition-colors duration-500 rounded-3xl ${card.borderColor}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
