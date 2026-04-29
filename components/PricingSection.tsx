'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Zap, Sparkles } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Perfect for small businesses just getting started.',
    monthlyPrice: 999,
    yearlyPrice: 599,
    features: [
      '1 channel (WA or Email)',
      '500 AI replies/month',
      'Basic lead tagging',
      'Email support',
      '1 team member',
    ],
    cta: 'Start Free Trial',
    featured: false,
    badge: null,
    psychology: null,
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    desc: 'Most popular. Convert leads at scale with full automation.',
    monthlyPrice: 2499,
    yearlyPrice: 1499,
    features: [
      'All 3 channels (WA+EM+IG)',
      'Unlimited AI replies',
      'HOT/WARM/COLD scoring',
      'Automation workflows',
      '5 team members',
      'Priority support',
      'Analytics dashboard',
    ],
    cta: 'Get Started Now',
    featured: true,
    badge: 'Most Popular',
    psychology: 'Unlock advanced automation',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For high-volume teams with custom dedicated support.',
    monthlyPrice: 7999,
    yearlyPrice: 4799,
    features: [
      'Everything in Growth',
      'Unlimited team members',
      'Custom AI model training',
      'Dedicated account manager',
      'SLA guarantee (99.9%)',
      'Custom API integrations',
    ],
    cta: 'Contact Sales',
    featured: false,
    badge: 'Best Value',
    psychology: null,
  },
]

export default function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4 block"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto mb-10"
          >
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <button
              onClick={() => setYearly(false)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !yearly
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                yearly
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">
                SAVE 40%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${plan.featured ? 'md:scale-[1.03] md:-translate-y-3 z-10' : ''}`}
            >
              {/* Gradient border wrapper for featured */}
              {plan.featured && (
                <>
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-blue-500/50 via-cyan-400/30 to-blue-600/20 blur-[1px]" />
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-blue-500/60 via-cyan-400/40 to-transparent" />
                  {/* Animated glow pulse */}
                  <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-md animate-pulse" />
                </>
              )}

              <motion.div
                whileHover={{ y: plan.featured ? -6 : -4, scale: plan.featured ? 1.01 : 1.01 }}
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
                <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
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

                  {/* Card body with flex layout for equal heights */}
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-white/90'}`}>
                        {plan.name}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed min-h-[40px]">
                        {plan.desc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-8">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={yearly ? 'y' : 'm'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className={`text-5xl font-bold tracking-tight ${plan.featured ? 'text-white' : 'text-white/90'}`}
                        >
                          ₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-white/40 text-base font-medium">/mo</span>
                      {yearly && plan.yearlyPrice < plan.monthlyPrice && (
                        <span className="text-xs text-emerald-400/80 font-medium ml-1">
                          billed annually
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className={`w-full h-px mb-6 ${plan.featured ? 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' : 'bg-white/5'}`} />

                    {/* Features - flex-1 pushes button to bottom */}
                    <div className="flex-1 space-y-3.5 mb-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 group/feature">
                          <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 ${
                            plan.featured
                              ? 'bg-blue-500/10 border border-blue-500/30 group-hover/feature:bg-blue-500/20 group-hover/feature:border-blue-400/50'
                              : 'bg-white/5 border border-white/10 group-hover/feature:bg-white/10 group-hover/feature:border-white/20'
                          }`}>
                            <Check size={12} className={plan.featured ? 'text-cyan-400' : 'text-blue-400'} />
                          </div>
                          <span className="text-sm text-white/70 group-hover/feature:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom section - always at bottom */}
                    <div className="mt-auto">
                      {/* Psychology text */}
                      {plan.psychology && (
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <Sparkles size={14} className="text-cyan-400" />
                          <span className="text-xs text-cyan-400/80 font-medium">
                            {plan.psychology}
                          </span>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Link
                        href={plan.id === 'enterprise' ? '/contact' : '/signup'}
                        className={`group/btn w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                          plan.featured
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_8px_30px_rgba(0,102,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,212,255,0.45)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98]'
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {plan.cta}
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>

                      {/* Recommended text */}
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

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm"
        >
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-emerald-500" />
            <span>14-day free trial</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
