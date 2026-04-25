'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Inbox, Tags, Zap } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import BentoSection from '@/components/BentoSection'
import MarqueeBanner from '@/components/MarqueeBanner'
import Testimonials from '@/components/Testimonials'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <MarqueeBanner />
      {/* Problem Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 text-xs font-semibold tracking-wide uppercase mb-6"
          >
            The Problem
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Leads don’t wait—and delayed replies cost you business</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            Today’s customers expect instant communication. But most businesses still rely on manual replies, switching between apps, and delayed follow-ups. This leads to missed opportunities, poor customer experience, and lost revenue.
          </p>
          <p className="text-xl font-medium text-gray-300">
            Every unanswered message is a lost chance.
          </p>
        </div>
      </section>

      {/* Solution & Features Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 text-xs font-semibold tracking-wide uppercase mb-6"
            >
              The Solution
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">AI that understands conversations and responds instantly</h2>
            <p className="text-lg text-gray-400">
              Sandesh AI reads every incoming message, understands the context, and generates intelligent replies tailored to your business. Whether it’s a pricing inquiry, service question, or support request—your response is instant, accurate, and professional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <Bot />, title: 'AI Smart Replies', desc: 'Generate human-like responses instantly using context-aware AI trained to understand intent, tone, and customer needs.' },
              { icon: <Inbox />, title: 'Unified Inbox', desc: 'Manage all your conversations—WhatsApp, Email, Instagram—in one clean, organized dashboard.' },
              { icon: <Tags />, title: 'Lead Qualification', desc: 'Automatically categorize conversations into HOT, WARM, and COLD leads based on intent and urgency.' },
              { icon: <Zap />, title: 'Automation', desc: 'Set up automatic replies, follow-ups, and workflows that run 24/7 without manual effort.' },
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-[#111] border border-white/5 hover:bg-[#151515] hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-[18px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BentoSection />

      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden min-h-[600px] flex items-center justify-center">
        {/* Glow Background instead of 3D Canvas */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066FF]/20 via-[#050505] to-[#050505] opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(0,102,255,0.2)]"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">Ready to scale?</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Every second matters. While you're reading this, someone is messaging your business. Respond instantly and convert faster with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Start for free <ArrowRight size={18} />
              </Link>
              <Link href="/demo" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-semibold transition-all">
                View Demo
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              No credit card required · Setup in minutes · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
