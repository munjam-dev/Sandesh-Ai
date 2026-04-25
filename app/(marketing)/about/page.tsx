'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Built for businesses that move fast
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="prose prose-invert prose-lg mx-auto"
      >
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Sandesh AI was created to solve a simple but critical problem—delayed responses.
        </p>
        <p className="text-gray-400 leading-relaxed mb-6">
          In a world where customers expect instant communication, businesses struggle to keep up. We built Sandesh AI to ensure every message is answered instantly, accurately, and professionally.
        </p>
        <p className="text-gray-400 leading-relaxed mb-12">
          Our mission is to simplify communication and help businesses convert more leads with less effort.
        </p>

        <h2 className="text-3xl font-bold mb-8 text-white">Our Values</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xl font-bold mb-2 text-white">Speed</h3>
            <p className="text-gray-400 text-sm">Respond instantly</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xl font-bold mb-2 text-white">Simplicity</h3>
            <p className="text-gray-400 text-sm">Easy to use</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xl font-bold mb-2 text-white">Reliability</h3>
            <p className="text-gray-400 text-sm">Consistent performance</p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#0066FF] text-white font-bold rounded-full hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(0,102,255,0.3)]">
            Join the future of communication
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
