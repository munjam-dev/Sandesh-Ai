'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch relative z-10 mb-32">
          {[
            {
              id: 'free',
              name: 'Free',
              desc: 'Perfect for testing the waters.',
              price: '$0',
              period: '/mo',
              featured: false,
              badge: null,
              psychology: null,
              features: [
                { text: '100 AI replies', icon: 'check' },
                { text: '1 channel', icon: 'check' },
                { text: 'Basic inbox', icon: 'check' },
                { text: 'No automation', icon: 'x' },
              ],
              cta: 'Start Free',
              ctaHref: '/signup',
              ctaType: 'link',
            },
            {
              id: 'starter',
              name: 'Starter',
              desc: 'For small businesses starting to grow.',
              price: '₹2,900',
              period: '/mo',
              featured: false,
              badge: null,
              psychology: null,
              features: [
                { text: '1000 AI replies', icon: 'check' },
                { text: '2 channels', icon: 'check' },
                { text: 'Lead tagging', icon: 'check' },
                { text: 'Basic campaigns', icon: 'check' },
              ],
              cta: 'Get Starter',
              ctaHref: null,
              ctaType: 'checkout',
              checkoutPlan: 'starter',
            },
            {
              id: 'growth',
              name: 'Growth',
              desc: 'Convert more leads automatically.',
              price: '₹9,900',
              period: '/mo',
              featured: true,
              badge: 'Most Popular',
              psychology: 'Unlock advanced automation',
              features: [
                { text: '5000 AI replies', icon: 'check' },
                { text: 'All channels', icon: 'check' },
                { text: 'AI campaigns', icon: 'check' },
                { text: 'Automation workflows', icon: 'check', bold: true },
                { text: 'Priority support', icon: 'check' },
              ],
              cta: 'Get Growth',
              ctaHref: null,
              ctaType: 'checkout',
              checkoutPlan: 'growth',
            },
            {
              id: 'pro',
              name: 'Pro',
              desc: 'For large teams and enterprises.',
              price: 'Custom',
              period: '',
              featured: false,
              badge: 'Best Value',
              psychology: null,
              features: [
                { text: '15000+ AI replies', icon: 'check' },
                { text: 'Advanced automation', icon: 'check' },
                { text: 'Multi-step campaigns', icon: 'check' },
                { text: 'Analytics dashboard', icon: 'check' },
                { text: 'Team collaboration', icon: 'check' },
              ],
              cta: 'Go Pro',
              ctaHref: '/contact',
              ctaType: 'link',
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${plan.featured ? 'md:scale-[1.03] md:-translate-y-3 z-10' : ''}`}
            >
              {/* Gradient border wrapper for featured */}
              {plan.featured && (
                <>
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-blue-500/50 via-cyan-400/30 to-blue-600/20 blur-[1px]" />
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-blue-500/60 via-cyan-400/40 to-transparent" />
                  <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-md animate-pulse" />
                </>
              )}

              <motion.div
                whileHover={{ y: plan.featured ? -6 : -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col h-full rounded-3xl border backdrop-blur-2xl overflow-hidden ${
                  plan.featured
                    ? 'bg-white/[0.08] border-transparent shadow-[0_0_60px_rgba(0,102,255,0.15)]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05] shadow-none hover:shadow-[0_0_40px_rgba(0,102,255,0.08)]'
                } transition-all duration-500`}
              >
                {/* Floating animation for featured */}
                {plan.featured && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 pointer-events-none"
                  />
                )}

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
                />

                {/* Inner gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  plan.featured
                    ? 'from-blue-600/10 via-cyan-500/5 to-transparent'
                    : 'from-white/[0.02] to-transparent'
                }`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8">
                  {/* Badge */}
                  {plan.badge && (
                    <div className={`absolute -top-px left-1/2 -translate-x-1/2 ${plan.featured ? 'w-36' : 'w-28'}`}>
                      <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30" />
                      <span className={`relative block w-full text-center text-white text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-b-xl shadow-lg flex items-center justify-center gap-1 ${
                        plan.featured
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                          : 'bg-white/10 border border-white/10'
                      }`}>
                        {plan.featured && <Zap size={12} />}
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Card body */}
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`text-xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-gray-200'}`}>
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed min-h-[40px]">
                        {plan.desc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className={`text-4xl font-black tracking-tight ${plan.featured ? 'text-white' : 'text-white/90'}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 text-base font-normal">{plan.period}</span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-px mb-6 ${plan.featured ? 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' : 'bg-white/5'}`} />

                    {/* Features */}
                    <div className="flex-1 space-y-3.5 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          {feature.icon === 'check' ? (
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center ${
                              plan.featured
                                ? 'bg-blue-500/10 border border-blue-500/30'
                                : 'bg-white/5 border border-white/10'
                            }`}>
                              <Check size={12} className={plan.featured ? 'text-cyan-400' : 'text-blue-400'} />
                            </div>
                          ) : (
                            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center bg-white/5 border border-white/10">
                              <X size={12} className="text-gray-600" />
                            </div>
                          )}
                          <span className={`text-sm ${feature.icon === 'x' ? 'text-gray-600' : plan.featured ? 'text-gray-200' : 'text-gray-300'} ${(feature as any).bold === true ? 'font-bold' : ''}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto">
                      {plan.psychology && (
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <Sparkles size={14} className="text-cyan-400" />
                          <span className="text-xs text-cyan-400/80 font-medium">
                            {plan.psychology}
                          </span>
                        </div>
                      )}

                      {plan.ctaType === 'link' ? (
                        <Link
                          href={plan.ctaHref || '/signup'}
                          className={`group/btn w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                            plan.featured
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_8px_30px_rgba(0,102,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,212,255,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98]'
                              : 'bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                        >
                          {plan.cta}
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      ) : (
                        <CheckoutButton
                          plan={plan.checkoutPlan || 'starter'}
                          priceText={plan.name}
                          className={`group w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                            plan.featured
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_8px_30px_rgba(0,102,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,212,255,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98]'
                              : 'bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 hover:bg-[#0066FF]/20 hover:scale-[1.02] active:scale-[0.98]'
                          }`}
                        />
                      )}

                      {plan.featured && (
                        <p className="text-center text-[10px] text-white/30 mt-3 uppercase tracking-wider font-medium">
                          Recommended by 500+ teams
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
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
