'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Perfect for small businesses just getting started.',
    monthlyPrice: 999,
    yearlyPrice: 799,
    features: [
      '1 channel (WA or Email)',
      '500 AI replies/month',
      'Basic lead tagging',
      'Email support',
      '1 team member',
    ],
    cta: 'Start Free Trial',
    featured: false,
    gradient: 'from-blue-500/5 to-transparent'
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    desc: 'Most popular. Convert leads at scale with full automation.',
    monthlyPrice: 2499,
    yearlyPrice: 1999,
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
    gradient: 'from-blue-600/10 via-cyan-600/5 to-transparent'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For high-volume teams with custom dedicated support.',
    monthlyPrice: 7999,
    yearlyPrice: 6399,
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
    gradient: 'from-purple-500/5 to-transparent'
  },
]

export default function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setYearly(false)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${!yearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              Yearly
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8, scale: plan.featured ? 1.06 : 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col p-8 md:p-10 rounded-[32px] border transition-all duration-500 overflow-hidden ${
                plan.featured
                  ? 'bg-white/[0.05] border-blue-500/40 shadow-[0_0_80px_rgba(0,102,255,0.2)] z-10'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              
              {/* Gradient Backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`} />

              {plan.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-8">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20" />
                  <span className="relative block w-full text-center bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-b-xl shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed h-12">
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={yearly ? 'y' : 'm'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-5xl font-bold text-white tracking-tight"
                    >
                      ₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/40 text-base font-medium">/mo</span>
                </div>
              </div>

              <div className="relative z-10 flex-grow space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 group/feature">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover/feature:border-blue-500/50 group-hover/feature:bg-blue-500/10">
                      <Check size={12} className="text-blue-500" />
                    </div>
                    <span className="text-sm text-white/70 group-hover/feature:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                <Link
                  href={plan.id === 'enterprise' ? '/contact' : '/signup'}
                  className={`group/btn w-full py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_20px_40px_rgba(0,102,255,0.3)] hover:shadow-[0_25px_50px_rgba(0,102,255,0.4)] hover:scale-[1.02] active:scale-95'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
