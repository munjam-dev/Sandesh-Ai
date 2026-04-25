'use client'

import { motion } from 'framer-motion'
import { Bot, Inbox, Tags, Zap } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Everything you need to manage and convert conversations
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400"
        >
          From AI-powered replies to unified communication, Sandesh AI gives you complete control over your conversations.
        </motion.p>
      </div>

      <div className="space-y-32">
        {/* AI Replies */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
              <Bot size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Smarter replies powered by AI</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Our AI understands customer intent and generates responses that feel natural and relevant. You can customize tone, style, and business context for consistent communication.
            </p>
          </motion.div>
          <div className="h-64 rounded-3xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/10 flex items-center justify-center shadow-2xl">
            {/* Placeholder graphic */}
            <div className="text-blue-500/20 font-bold text-4xl">AI Engine</div>
          </div>
        </div>

        {/* Unified Inbox */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-64 rounded-3xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/10 flex items-center justify-center shadow-2xl md:order-1 order-2">
            <div className="text-purple-500/20 font-bold text-4xl">Inbox UI</div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:order-2 order-1">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
              <Inbox size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">All conversations in one place</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Stop switching between platforms. View and manage WhatsApp, Email, and Instagram messages in a single, clean interface.
            </p>
          </motion.div>
        </div>

        {/* Lead Intelligence */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6">
              <Tags size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Know which leads matter most</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Automatically detect customer intent and prioritize high-value conversations. Focus your time on leads that are ready to convert.
            </p>
          </motion.div>
          <div className="h-64 rounded-3xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/10 flex items-center justify-center shadow-2xl">
            <div className="text-red-500/20 font-bold text-4xl">Lead Scoring</div>
          </div>
        </div>

        {/* Automation */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-64 rounded-3xl bg-gradient-to-br from-[#050505] to-[#111] border border-white/10 flex items-center justify-center shadow-2xl md:order-1 order-2">
            <div className="text-yellow-500/20 font-bold text-4xl">Workflows</div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:order-2 order-1">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Let AI handle repetitive work</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Automate responses, follow-ups, and workflows so your business runs efficiently even when you’re offline.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-32 text-center">
        <Link href="/signup" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
          Start managing your conversations smarter
        </Link>
      </div>
    </div>
  )
}
