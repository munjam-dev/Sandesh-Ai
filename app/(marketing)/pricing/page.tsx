'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Zap, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

const features = [
  { name: 'Monthly AI Replies', free: '100', starter: '1000', growth: '5000', pro: '15000+' },
  { name: 'Connected Channels', free: '1', starter: '2', growth: 'All', pro: 'All' },
  { name: 'Lead Tagging', free: false, starter: true, growth: true, pro: true },
  { name: 'AI Campaigns', free: false, starter: 'Basic', growth: 'Advanced', pro: 'Multi-step' },
  { name: 'Automation Workflows', free: false, starter: false, growth: true, pro: 'Advanced' },
  { name: 'Analytics Dashboard', free: false, starter: false, growth: 'Basic', pro: 'Advanced' },
  { name: 'Team Collaboration', free: false, starter: false, growth: false, pro: true },
  { name: 'Support', free: 'Community', starter: 'Email', growth: 'Priority', pro: 'Dedicated' },
]

const faqs = [
  { q: 'Can I upgrade anytime?', a: 'Yes! Your usage will be pro-rated and you will instantly get access to your new limits.' },
  { q: 'What happens after I reach my limit?', a: 'Your AI will stop replying automatically until the next billing cycle, or you can instantly upgrade your plan to continue.' },
  { q: 'Is there a free trial?', a: 'Yes, our Free Plan acts as a perpetual trial. You can test the platform with up to 100 replies per month forever.' },
  { q: 'Do you support WhatsApp?', a: 'Absolutely! Our platform supports seamless integration with the WhatsApp Cloud API to automate your chats.' },
]

export default function PricingPage() {
  const [userData, setUserData] = useState<any>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users')
        if (res.ok) {
          const data = await res.json()
          setUserData(data.user)
        }
      } catch (err) {}
    }
    fetchUser()
  }, [])

  const limits: Record<string, number> = { free: 100, starter: 1000, growth: 5000 }
  const currentLimit = userData ? limits[userData.plan] : 100
  const repliesUsed = userData ? userData.replies_used : 0
  const isNearLimit = currentLimit ? (repliesUsed / currentLimit) > 0.8 : false

  return (
    <div className="pt-32 pb-24 font-sans text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0066FF]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#00D4FF]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6">
            <Zap size={16} className="text-[#00D4FF]" />
            Pricing built for scale
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            Scale your conversations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D4FF]">AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Start free, upgrade when you're ready to convert more leads and automate your entire business workflow.
          </motion.p>

          {/* Usage Indicator (Logged In Users Only) */}
          {userData && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className={`mt-8 inline-flex flex-col items-center p-4 rounded-2xl border ${isNearLimit ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/10'} backdrop-blur-md`}
            >
              <div className="text-sm text-gray-300 mb-2">Current Billing Cycle Usage</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold">{repliesUsed} <span className="text-gray-500 text-lg font-normal">/ {currentLimit || '∞'} replies</span></div>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isNearLimit ? 'bg-orange-500' : 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF]'}`} 
                  style={{ width: `${Math.min((repliesUsed / (currentLimit || 1)) * 100, 100)}%` }}
                />
              </div>
              {isNearLimit && (
                <div className="mt-3 text-sm text-orange-400 font-medium flex items-center gap-1">
                  <Zap size={14} /> Upgrade to unlock more replies and automation
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 items-end relative z-10">
          
          {/* Free Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col h-full group">
            <h3 className="text-xl font-bold mb-2 text-gray-200">Free</h3>
            <p className="text-sm text-gray-500 mb-6">Perfect for testing the waters.</p>
            <div className="text-4xl font-black mb-8">$0<span className="text-base text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-300">
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> 100 AI replies</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> 1 channel</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> Basic inbox</li>
              <li className="flex gap-3 items-start text-gray-600"><X size={20} className="mt-0.5 shrink-0" /> No automation</li>
            </ul>
            <Link href="/signup" className="w-full py-4 rounded-xl font-bold flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group-hover:border-white/30">
              Start Free
            </Link>
          </motion.div>

          {/* Starter Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col h-full group">
            <h3 className="text-xl font-bold mb-2 text-[#0066FF]">Starter</h3>
            <p className="text-sm text-gray-500 mb-6">For small businesses starting to grow.</p>
            <div className="text-4xl font-black mb-8">₹2,900<span className="text-base text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-300">
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#0066FF] mt-0.5 shrink-0" /> 1000 AI replies</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#0066FF] mt-0.5 shrink-0" /> 2 channels</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#0066FF] mt-0.5 shrink-0" /> Lead tagging</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#0066FF] mt-0.5 shrink-0" /> Basic campaigns</li>
            </ul>
            <CheckoutButton plan="starter" priceText="Starter" className="w-full py-4 rounded-xl font-bold flex items-center justify-center bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 hover:bg-[#0066FF]/20 transition-all" />
          </motion.div>

          {/* Growth Plan (Most Popular) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-3xl bg-gradient-to-b from-[#0066FF]/20 to-[#00D4FF]/10 border border-[#00D4FF]/50 relative flex flex-col transform lg:-translate-y-4 shadow-[0_0_40px_rgba(0,212,255,0.15)] group h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Zap size={14} /> Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Growth</h3>
            <p className="text-sm text-[#00D4FF] mb-6 font-medium">Convert more leads automatically.</p>
            <div className="text-4xl font-black mb-8 text-white">₹9,900<span className="text-base text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-200">
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#00D4FF] mt-0.5 shrink-0" /> 5000 AI replies</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#00D4FF] mt-0.5 shrink-0" /> All channels</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#00D4FF] mt-0.5 shrink-0" /> AI campaigns</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#00D4FF] mt-0.5 shrink-0 font-bold" /> Automation workflows</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-[#00D4FF] mt-0.5 shrink-0" /> Priority support</li>
            </ul>
            <CheckoutButton plan="growth" priceText="Growth Plan" className="w-full py-4 rounded-xl font-bold flex items-center justify-center bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-all" />
          </motion.div>

          {/* Pro Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col h-full group">
            <h3 className="text-xl font-bold mb-2 text-gray-200">Pro</h3>
            <p className="text-sm text-gray-500 mb-6">For large teams and enterprises.</p>
            <div className="text-4xl font-black mb-8">Custom</div>
            <ul className="space-y-4 mb-8 flex-1 text-gray-300">
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> 15000+ AI replies</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> Advanced automation</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> Multi-step campaigns</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> Analytics dashboard</li>
              <li className="flex gap-3 items-start"><Check size={20} className="text-white mt-0.5 shrink-0" /> Team collaboration</li>
            </ul>
            <Link href="/contact" className="w-full py-4 rounded-xl font-bold flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-all">
              Go Pro
            </Link>
          </motion.div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Features</h2>
            <p className="text-gray-400">Everything you need to know to make the right choice.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 font-medium text-gray-400 w-1/3">Features</th>
                  <th className="p-4 font-bold text-white">Free</th>
                  <th className="p-4 font-bold text-[#0066FF]">Starter</th>
                  <th className="p-4 font-bold text-[#00D4FF]">Growth</th>
                  <th className="p-4 font-bold text-white">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {features.map((f, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-gray-300 font-medium">{f.name}</td>
                    <td className="p-4 text-gray-400">{typeof f.free === 'boolean' ? (f.free ? <Check size={18} className="text-white"/> : <X size={18} className="text-gray-600"/>) : f.free}</td>
                    <td className="p-4 text-gray-200">{typeof f.starter === 'boolean' ? (f.starter ? <Check size={18} className="text-[#0066FF]"/> : <X size={18} className="text-gray-600"/>) : f.starter}</td>
                    <td className="p-4 font-medium text-[#00D4FF]">{typeof f.growth === 'boolean' ? (f.growth ? <Check size={18} className="text-[#00D4FF]"/> : <X size={18} className="text-gray-600"/>) : f.growth}</td>
                    <td className="p-4 text-gray-200">{typeof f.pro === 'boolean' ? (f.pro ? <Check size={18} className="text-white"/> : <X size={18} className="text-gray-600"/>) : f.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-32 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all hover:bg-white/[0.04]">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-lg">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${openFaq === i ? 'rotate-180 text-[#00D4FF]' : 'text-gray-500'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-400 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00D4FF]/20 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <ShieldCheck size={48} className="mx-auto mb-6 text-[#00D4FF]" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Start converting more leads today</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
              Join hundreds of modern businesses using Sandesh AI to automate their customer interactions and increase conversion rates.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all relative z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start Free Trial <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
