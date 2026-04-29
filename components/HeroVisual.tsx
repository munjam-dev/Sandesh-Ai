'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MessageCircle, Mail, Camera, Zap, TrendingUp, Bot } from 'lucide-react'

const FLOAT_CARDS = [
  {
    id: 'leads',
    icon: <TrendingUp size={14} className="text-emerald-400" />,
    label: '3 HOT Leads',
    sublabel: 'Just converted',
    color: '#10B981',
    position: { top: '5%', left: '-8%' },
    delay: 0
  },
  {
    id: 'reply',
    icon: <Bot size={14} className="text-blue-400" />,
    label: 'AI replied instantly',
    sublabel: '0.3s response time',
    color: '#0066FF',
    position: { top: '55%', left: '-12%' },
    delay: 0.5
  },
  {
    id: 'campaign',
    icon: <Zap size={14} className="text-yellow-400" />,
    label: 'Campaign sent',
    sublabel: '1,240 messages',
    color: '#F59E0B',
    position: { top: '5%', right: '-8%' },
    delay: 1
  },
  {
    id: 'conversion',
    icon: <TrendingUp size={14} className="text-cyan-400" />,
    label: 'Conversion +24%',
    sublabel: 'This week',
    color: '#00D4FF',
    position: { bottom: '15%', right: '-10%' },
    delay: 1.5
  },
]

const MESSAGES = [
  { from: 'customer', text: 'Hi, what are your pricing plans?', time: '2:30 PM' },
  { from: 'ai', text: 'Hi there! 👋 We offer three plans starting from ₹999/mo. The Pro plan at ₹2,499/mo is our most popular and includes unlimited AI replies, automation, and analytics. Want me to share more details?', time: '2:30 PM', typing: false },
  { from: 'customer', text: 'Yes! Tell me about Pro.', time: '2:31 PM' },
]

export default function HeroVisual() {
  const [currentMsg, setCurrentMsg] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [shownMessages, setShownMessages] = useState<number[]>([0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rotateX.set(((e.clientY - cy) / cy) * -8)
      rotateY.set(((e.clientX - cx) / cx) * 8)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [rotateX, rotateY])

  // Simulate live AI chat
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setShownMessages(prev => {
          const next = (prev[prev.length - 1] + 1) % MESSAGES.length
          if (prev.includes(next)) return [0]
          return [...prev, next]
        })
      }, 1800)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[560px] flex items-center justify-center">

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0066FF]/20 blur-[80px]" />
        <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-[#00D4FF]/15 blur-[60px]" />
      </div>

      {/* Floating notification cards */}
      {FLOAT_CARDS.map((card) => (
        <motion.div
          key={card.id}
          className="absolute z-20 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-default select-none"
          style={card.position as any}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: card.delay + 0.8 },
            scale: { duration: 0.5, delay: card.delay + 0.8 },
            y: { duration: 3 + card.delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.25)' }}
        >
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${card.color}20` }}>
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-semibold text-white whitespace-nowrap">{card.label}</p>
            <p className="text-[10px] text-gray-500 whitespace-nowrap">{card.sublabel}</p>
          </div>
        </motion.div>
      ))}

      {/* Main 3D card stack */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className="w-full max-w-[400px] lg:max-w-[420px]"
      >

        {/* Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl bg-[#0d0d0d] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="flex-1 mx-2 h-5 rounded-md bg-white/[0.04] flex items-center px-2">
              <span className="text-[9px] text-gray-600 truncate">app.sandesh.ai/inbox</span>
            </div>
          </div>

          <div className="flex h-[320px]">
            {/* Sidebar */}
            <div className="w-[52px] border-r border-white/5 flex flex-col items-center gap-3 py-4 bg-black/20">
              {[MessageCircle, Mail, Camera, Zap, TrendingUp].map((Icon, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${i === 0 ? 'bg-[#0066FF]/20 text-[#0066FF]' : 'text-gray-600 hover:text-gray-400'}`}
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>

            {/* Conversation list */}
            <div className="w-[130px] border-r border-white/5 flex flex-col">
              <div className="px-3 py-2 border-b border-white/5">
                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">Inbox</p>
              </div>
              {[
                { name: 'Rahul M.', msg: 'Interested in Pro', badge: 'HOT', color: '#EF4444', channel: '📱' },
                { name: 'Priya S.', msg: 'Pricing query', badge: 'WARM', color: '#F59E0B', channel: '📧' },
                { name: 'Amit K.', msg: 'Support request', badge: 'COLD', color: '#3B82F6', channel: '📷' },
                { name: 'Neha R.', msg: 'Demo request', badge: 'HOT', color: '#EF4444', channel: '📱' },
              ].map((conv, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 cursor-pointer border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors ${i === 0 ? 'bg-white/[0.05]' : ''}`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-semibold text-white truncate">{conv.channel} {conv.name}</span>
                    <span className="text-[7px] font-bold px-1 py-0.5 rounded-full text-white" style={{ backgroundColor: conv.color }}>{conv.badge}</span>
                  </div>
                  <p className="text-[8px] text-gray-500 truncate">{conv.msg}</p>
                </div>
              ))}
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center text-[7px] font-bold text-white">R</div>
                <div>
                  <p className="text-[9px] font-semibold text-white">Rahul M.</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-[7px] text-emerald-400">Online</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">HOT</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
                {shownMessages.map((msgIdx) => {
                  const msg = MESSAGES[msgIdx]
                  if (!msg) return null
                  return (
                    <motion.div
                      key={`${msgIdx}-${msg.from}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}
                    >
                      {msg.from === 'ai' && (
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center mr-1 flex-shrink-0 mt-0.5">
                          <Bot size={8} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-2 py-1.5 rounded-xl text-[8px] leading-relaxed ${
                          msg.from === 'ai'
                            ? 'bg-[#0066FF]/20 text-gray-200 border border-[#0066FF]/20'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1"
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center mr-1 flex-shrink-0">
                      <Bot size={8} className="text-white" />
                    </div>
                    <div className="px-2.5 py-2 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/20 flex gap-1 items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 rounded-full bg-[#0066FF]"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                    <span className="text-[7px] text-[#0066FF] ml-0.5">AI composing...</span>
                  </motion.div>
                )}
              </div>

              {/* AI Badge */}
              <div className="px-3 py-2 border-t border-white/5 flex items-center gap-2">
                <div className="flex-1 h-5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center px-2">
                  <span className="text-[7px] text-gray-600">AI reply suggestion...</span>
                </div>
                <div className="px-2 py-1 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/30">
                  <span className="text-[7px] font-bold text-[#0066FF]">SEND</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics widget below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 grid grid-cols-3 gap-2"
        >
          {[
            { label: 'Replies Today', value: '248', change: '+18%', color: '#0066FF' },
            { label: 'Conversion', value: '34.2%', change: '+5.1%', color: '#10B981' },
            { label: 'Hot Leads', value: '12', change: 'new', color: '#EF4444' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="px-3 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-md"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.07)' }}
            >
              <p className="text-[8px] text-gray-500 mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-white">{stat.value}</p>
              <p className="text-[8px] font-semibold" style={{ color: stat.color }}>{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
