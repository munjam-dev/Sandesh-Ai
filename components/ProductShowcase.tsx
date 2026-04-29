'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Mail, Camera, Bot, Zap, TrendingUp, Users, CheckCircle } from 'lucide-react'

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4 block">Product Showcase</span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            One dashboard. <span className="text-blue-500">Every conversation.</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Stop juggling apps. Manage every customer interaction from a single, AI-powered workspace.
          </p>
        </div>

        <motion.div
          style={{ scale: springScale, opacity }}
          className="relative mx-auto"
        >
          {/* Glass Window */}
          <div className="relative rounded-3xl bg-[#0d0d0d] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-6 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                <span className="text-xs text-white/20">app.sandesh.ai — Unified Team Inbox</span>
              </div>
            </div>

            <div className="flex h-[400px] md:h-[600px]">
              {/* Sidebar */}
              <div className="w-20 border-r border-white/5 flex flex-col items-center gap-6 py-8 bg-black/40">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                {[MessageCircle, Mail, Camera, Zap, TrendingUp, Users].map((Icon, i) => (
                  <div key={i} className={`text-white/20 hover:text-white transition-colors cursor-pointer ${i === 0 ? 'text-blue-500' : ''}`}>
                    <Icon size={20} />
                  </div>
                ))}
              </div>

              {/* Main Area Mock */}
              <div className="flex-1 p-10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-bold text-white">Active Conversations</h3>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/40">HOT LEADS: 12</div>
                    <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-500">AI ACTIVE</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="w-32 h-3 bg-white/10 rounded mb-3" />
                        <div className="w-full h-2 bg-white/5 rounded" />
                      </div>
                      <div className="w-20 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] -z-10" />
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-cyan-600/10 blur-[120px] -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
