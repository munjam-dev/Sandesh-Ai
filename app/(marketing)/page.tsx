'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Inbox, Tags, Zap, CheckCircle2 } from 'lucide-react'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      {/* Problem Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-medium mb-6"
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
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#00D4FF]/20 border border-[#0066FF]/30 flex items-center justify-center text-[#00D4FF] mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works & Results */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">How it works</h2>
            <div className="space-y-8">
              {[
                { step: '01', text: 'Connect your channels in seconds' },
                { step: '02', text: 'AI reads and understands incoming messages' },
                { step: '03', text: 'AI suggests or sends replies instantly' },
                { step: '04', text: 'You convert more leads with less effort' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="text-2xl font-black text-white/10">{item.step}</div>
                  <div className="text-lg font-medium text-gray-300">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0066FF]/10 to-transparent border border-[#0066FF]/20 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8">The Results</h3>
            <ul className="space-y-4">
              {[
                'Respond instantly to every inquiry',
                'Increase lead conversion rates',
                'Save hours of manual work every week',
                'Deliver a better customer experience',
              ].map((res, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="text-[#00D4FF] shrink-0" size={20} />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
            <h2 className="text-4xl md:text-5xl font-black mb-6">Your next customer is already reaching out</h2>
            <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
              Every second matters. While you're reading this, someone is messaging your business. Respond instantly and convert faster with AI.
            </p>
            <p className="text-sm font-semibold text-[#00D4FF] uppercase tracking-widest mb-10">
              Operate globally. Respond instantly. Convert consistently.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="/demo" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-semibold transition-all">
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
