'use client'

import { motion } from 'framer-motion'
import { Zap, Bot, Bell, CheckCircle, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    icon: <Bell className="text-orange-400" />,
    title: 'Message Received',
    desc: 'Customer sends a message on WhatsApp, Email, or Instagram.',
    color: '#F59E0B',
  },
  {
    id: 2,
    icon: <Bot className="text-blue-400" />,
    title: 'AI Analyzes Intent',
    desc: 'Sandesh AI understands context, tone, and urgency instantly.',
    color: '#3B82F6',
  },
  {
    id: 3,
    icon: <Zap className="text-purple-400" />,
    title: 'Reply Generated',
    desc: 'A personalized, human-like response is crafted in under 1 second.',
    color: '#8B5CF6',
  },
  {
    id: 4,
    icon: <CheckCircle className="text-emerald-400" />,
    title: 'Lead Qualified',
    desc: 'Tagged HOT/WARM/COLD and team notified — fully automated.',
    color: '#10B981',
  },
]

export default function AutomationSection() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-6 block">Automation</span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-8">
              From message to conversion in seconds
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-lg">
              Every incoming message triggers a fully automated workflow. AI handles the response, qualification, and follow-up — you just close the deal.
            </p>
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 text-white font-bold group"
            >
              Learn about our automation engine 
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-blue-500" />
            </Link>
          </div>

          {/* Right: Steps */}
          <div className="space-y-6 relative">
            {/* Connection Line */}
            <div className="absolute left-10 top-10 bottom-10 w-px bg-white/5 hidden md:block" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="relative flex gap-8 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
              >
                <div 
                  className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                  style={{ backgroundColor: `${step.color}20`, borderColor: `${step.color}40` }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Link({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}
