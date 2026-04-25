'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Simple pricing built for growing businesses
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400"
        >
          Choose a plan that fits your needs and scale as you grow.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {/* Free Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col">
          <h3 className="text-xl font-bold mb-2">Free Plan</h3>
          <div className="text-3xl font-black mb-6">$0<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-gray-300 text-sm">
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> 100 AI replies per month</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> 1 connected channel</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Basic AI responses</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Ideal for testing and small usage</li>
          </ul>
          <Link href="/signup" className="w-full py-3 rounded-xl font-bold flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all text-white mt-auto">
            Get Free Plan
          </Link>
        </motion.div>

        {/* Starter Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 rounded-3xl bg-gradient-to-b from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 relative flex flex-col transform hover:-translate-y-2 transition-transform">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
          <h3 className="text-xl font-bold mb-2">Starter Plan</h3>
          <div className="text-3xl font-black mb-6">₹2,900<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-gray-300 text-sm">
            <li className="flex gap-2"><Check size={18} className="text-[#0066FF]" /> 1000 AI replies</li>
            <li className="flex gap-2"><Check size={18} className="text-[#0066FF]" /> 2 channels</li>
            <li className="flex gap-2"><Check size={18} className="text-[#0066FF]" /> Lead tagging and prioritization</li>
            <li className="flex gap-2"><Check size={18} className="text-[#0066FF]" /> Best for small businesses</li>
          </ul>
          <CheckoutButton 
            plan="starter" 
            priceText="Starter" 
            className="bg-[#0066FF] hover:bg-[#0052cc] text-white mt-auto shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)]" 
          />
        </motion.div>

        {/* Growth Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col">
          <h3 className="text-xl font-bold mb-2">Growth Plan</h3>
          <div className="text-3xl font-black mb-6">₹9,900<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1 text-gray-300 text-sm">
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> 5000 AI replies</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> All channels</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Advanced AI features</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Best for scaling teams</li>
          </ul>
          <CheckoutButton 
            plan="growth" 
            priceText="Growth" 
            className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:scale-105 text-white mt-auto" 
          />
        </motion.div>

        {/* Pro Plan */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-col">
          <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
          <div className="text-3xl font-black mb-6">Custom</div>
          <ul className="space-y-4 mb-8 flex-1 text-gray-300 text-sm">
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> 15000+ AI replies</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Team collaboration</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Automation workflows</li>
            <li className="flex gap-2"><Check size={18} className="text-[#00D4FF]" /> Priority support</li>
          </ul>
          <Link href="/contact" className="w-full py-3 rounded-xl font-bold flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-all mt-auto">
            Contact Sales
          </Link>
        </motion.div>
      </div>

      <div className="text-center mb-20">
        <Link href="/signup" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
          Choose your plan and get started
        </Link>
      </div>
    </div>
  )
}
