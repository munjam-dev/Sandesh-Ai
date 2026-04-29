'use client'

import { motion } from 'framer-motion'

const ITEMS = [
  '⚡ AI Smart Replies',
  '🎯 Lead Qualification',
  '📱 WhatsApp Automation',
  '📧 Email Campaigns',
  '📷 Instagram DMs',
  '🔁 Auto Follow-ups',
  '📊 Real-time Analytics',
  '🤖 24/7 AI Agent',
]

export default function MarqueeBanner() {
  return (
    <div className="relative overflow-hidden py-10 border-y border-white/5 bg-black">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />
      
      <motion.div
        className="flex gap-20 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="text-xl md:text-2xl font-bold text-white/20 hover:text-white/40 transition-colors cursor-default tracking-tight">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
