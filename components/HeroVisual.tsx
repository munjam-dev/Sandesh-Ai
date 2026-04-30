'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MessageCircle, Mail, Camera, Zap, TrendingUp, Bot, Sparkles, BarChart3, ArrowUpRight, Users, Send, Bell } from 'lucide-react'

const FLOAT_CARDS = [
  { id: 'leads', icon: TrendingUp, label: '3 HOT Leads', sublabel: 'Just converted', color: '#10B981', pos: { top: '2%', left: '-10%' }, delay: 0, dur: 3.5, range: [-6, 6] },
  { id: 'reply', icon: Bot, label: 'AI Replied', sublabel: '0.3s response', color: '#0066FF', pos: { top: '48%', left: '-14%' }, delay: 0.6, dur: 4, range: [-8, 8] },
  { id: 'campaign', icon: Zap, label: 'Campaign Sent', sublabel: '1,240 msgs', color: '#F59E0B', pos: { top: '0%', right: '-8%' }, delay: 1.2, dur: 3.8, range: [-5, 5] },
  { id: 'conversion', icon: BarChart3, label: 'Conversion +24%', sublabel: 'This week', color: '#00D4FF', pos: { bottom: '10%', right: '-12%' }, delay: 1.8, dur: 4.2, range: [-7, 7] },
  { id: 'notify', icon: Bell, label: 'New Message', sublabel: 'WhatsApp', color: '#8B5CF6', pos: { bottom: '40%', left: '-6%' }, delay: 2.4, dur: 3.2, range: [-4, 4] },
]

const MESSAGES = [
  { from: 'customer', text: 'Hi, what are your pricing plans?' },
  { from: 'ai', text: 'Hi there! 👋 Plans from ₹999/mo. Growth at ₹2,499/mo is most popular — unlimited AI replies, automation, analytics. Want details?' },
  { from: 'customer', text: 'Yes! Tell me about Growth.' },
  { from: 'ai', text: 'Growth gives all 3 channels (WA, Email, IG), unlimited AI replies, HOT/WARM/COLD scoring, automation workflows, priority support, and analytics. Perfect for scaling! 🚀' },
]

const CONVERSATIONS = [
  { name: 'Rahul M.', msg: 'Interested in Pro', badge: 'HOT', color: '#EF4444', ch: '📱' },
  { name: 'Priya S.', msg: 'Pricing query', badge: 'WARM', color: '#F59E0B', ch: '📧' },
  { name: 'Amit K.', msg: 'Support request', badge: 'COLD', color: '#3B82F6', ch: '📷' },
  { name: 'Neha R.', msg: 'Demo request', badge: 'HOT', color: '#EF4444', ch: '📱' },
  { name: 'Vikram T.', msg: 'Integration help', badge: 'WARM', color: '#F59E0B', ch: '📧' },
]

const STATS = [
  { label: 'Replies Today', value: '248', change: '+18%', color: '#0066FF', Icon: Send },
  { label: 'Conversion', value: '34.2%', change: '+5.1%', color: '#10B981', Icon: ArrowUpRight },
  { label: 'Hot Leads', value: '12', change: 'new', color: '#EF4444', Icon: Users },
]

const TIMES = ['2m', '5m', '12m', '18m', '32m']

export default function HeroVisual() {
  const [shownMsgs, setShownMsgs] = useState<number[]>([0])
  const [isTyping, setIsTyping] = useState(false)
  const [activeConv, setActiveConv] = useState(0)

  /* 3D tilt */
  const rawRx = useMotionValue(0)
  const rawRy = useMotionValue(0)
  const rotateX = useSpring(rawRx, { stiffness: 40, damping: 25, mass: 1.2 })
  const rotateY = useSpring(rawRy, { stiffness: 40, damping: 25, mass: 1.2 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = document.getElementById('hero-visual')
      if (!el) return
      const r = el.getBoundingClientRect()
      rawRx.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -10)
      rawRy.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 10)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawRx, rawRy])

  /* Chat loop */
  const advance = useCallback(() => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setShownMsgs(p => {
        const n = (p[p.length - 1] + 1) % MESSAGES.length
        return p.includes(n) ? [0] : [...p, n]
      })
    }, 2200)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(advance, 3500)
    const iv = setInterval(advance, 6500)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [advance])

  /* Active conv cycle */
  useEffect(() => {
    const iv = setInterval(() => setActiveConv(p => (p + 1) % CONVERSATIONS.length), 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div id="hero-visual" className="relative w-full h-full min-h-[520px] lg:min-h-[600px] flex items-center justify-center select-none">

      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#0066FF]/[0.06] blur-[100px]" />
        <div className="absolute top-[30%] left-[20%] w-[250px] h-[250px] rounded-full bg-[#00D4FF]/[0.05] blur-[70px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[200px] h-[200px] rounded-full bg-[#8B5CF6]/[0.04] blur-[60px]" />
      </div>

      {/* Floating notification cards */}
      {FLOAT_CARDS.map(c => (
        <motion.div key={c.id}
          className="absolute z-30 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-default"
          style={c.pos as any}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: c.range }}
          transition={{
            opacity: { duration: 0.6, delay: c.delay + 0.8, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.6, delay: c.delay + 0.8, ease: [0.22, 1, 0.36, 1] },
            y: { duration: c.dur, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: c.delay },
          }}
          whileHover={{ scale: 1.06, borderColor: 'rgba(255,255,255,0.2)' }}
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}18` }}>
            <c.icon size={14} style={{ color: c.color }} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white whitespace-nowrap">{c.label}</p>
            <p className="text-[9px] text-white/40 whitespace-nowrap">{c.sublabel}</p>
          </div>
        </motion.div>
      ))}

      {/* 3D Scene */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
        className="w-full max-w-[420px] lg:max-w-[460px]"
      >
        {/* Depth layers */}
        <motion.div style={{ translateZ: -50 }} className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/[0.03] to-transparent border border-white/[0.03] scale-105 -z-10" />
        <motion.div style={{ translateZ: -25 }} className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.02] to-transparent border border-white/[0.04] scale-[1.02] -z-[5]" />

        {/* Dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full rounded-3xl bg-[#08080a] border border-white/[0.06] shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden"
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.03] bg-white/[0.01]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <div className="flex-1 mx-3 h-5 rounded-md bg-white/[0.02] border border-white/[0.03] flex items-center px-2.5">
              <span className="text-[9px] text-white/15 truncate">app.sandesh.ai/inbox</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles size={10} className="text-blue-500/40" />
              <span className="text-[8px] text-blue-500/40 font-medium">AI Active</span>
            </div>
          </div>

          <div className="flex h-[340px]">
            {/* Sidebar */}
            <div className="w-[54px] border-r border-white/[0.02] flex flex-col items-center gap-2.5 py-4 bg-black/[0.1]">
              {[MessageCircle, Mail, Camera, Zap, TrendingUp].map((Icon, i) => (
                <motion.div key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                    i === 0 ? 'bg-blue-500/12 text-blue-400' : 'text-white/15 hover:text-white/30 hover:bg-white/[0.02]'
                  }`}
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                >
                  <Icon size={14} />
                </motion.div>
              ))}
            </div>

            {/* Conversation list */}
            <div className="w-[140px] border-r border-white/[0.02] flex flex-col bg-black/[0.02]">
              <div className="px-3 py-2.5 border-b border-white/[0.02] flex justify-between items-center">
                <p className="text-[9px] font-semibold text-white/30 uppercase tracking-wider">Inbox</p>
                <span className="text-[8px] font-bold px-1.5 py-[1px] rounded-md bg-blue-500/[0.08] text-blue-400">5</span>
              </div>
              <div className="flex-1 overflow-hidden">
                {CONVERSATIONS.map((conv, i) => (
                  <motion.div key={i}
                    className={`px-3 py-2.5 cursor-pointer border-b border-white/[0.02] transition-colors ${
                      i === activeConv ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                    }`}
                    animate={{ backgroundColor: i === activeConv ? 'rgba(255,255,255,0.05)' : undefined }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-medium text-white/80 truncate">{conv.ch} {conv.name}</span>
                      {i === activeConv && <motion.span layoutId="active-dot" className="w-1 h-1 rounded-full bg-blue-400" />}
                    </div>
                    <p className="text-[8px] text-white/30 truncate">{conv.msg}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[7px] font-bold px-1 py-[1px] rounded-sm text-white/90" style={{ backgroundColor: `${conv.color}25` }}>
                        <span style={{ color: conv.color }}>{conv.badge}</span>
                      </span>
                      <span className="text-[7px] text-white/20">{TIMES[i]}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-black/[0.02]">
              <div className="px-3.5 py-2.5 border-b border-white/[0.02] flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[8px] font-bold text-white shadow-lg shadow-blue-500/20">R</div>
                <div>
                  <p className="text-[10px] font-semibold text-white/90">Rahul M.</p>
                  <div className="flex items-center gap-1">
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <p className="text-[8px] text-emerald-400/80">Online</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-[8px] font-bold px-1.5 py-[1px] rounded-md bg-red-500/[0.1] text-red-400 border border-red-500/[0.1]">HOT</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-3.5 flex flex-col gap-2.5 overflow-hidden">
                {shownMsgs.map((msgIdx: number) => {
                  const msg = MESSAGES[msgIdx]
                  if (!msg) return null
                  const isAI = msg.from === 'ai'
                  return (
                    <motion.div key={`${msgIdx}-${msg.from}`}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAI && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-1.5 flex-shrink-0 mt-0.5">
                          <Bot size={9} className="text-white" />
                        </div>
                      )}
                      <div className={`max-w-[85%] px-2.5 py-2 rounded-xl text-[9px] leading-relaxed ${
                        isAI
                          ? 'bg-blue-500/[0.12] text-white/90 border border-blue-500/[0.15]'
                          : 'bg-white/[0.08] text-white/90 border border-white/[0.05]'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mr-1.5 flex-shrink-0">
                      <Bot size={9} className="text-white" />
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-blue-500/[0.12] border border-blue-500/[0.15] flex gap-1.5 items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay }} />
                      ))}
                    </div>
                    <span className="text-[8px] text-blue-400/80 ml-0.5">AI composing...</span>
                  </motion.div>
                )}
              </div>

              {/* AI Badge */}
              <div className="px-3.5 py-2.5 border-t border-white/[0.02] flex items-center gap-2">
                <div className="flex-1 h-6 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center px-2.5">
                  <span className="text-[8px] text-white/20">AI reply suggestion...</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-blue-500/[0.12] border border-blue-500/[0.15] hover:bg-blue-500/[0.18] transition-colors cursor-pointer">
                  <span className="text-[8px] font-bold text-blue-400">SEND</span>
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
          {STATS.map((stat, i) => (
            <motion.div key={i}
              className="px-3 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md flex flex-col gap-1"
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-1.5">
                <stat.Icon size={11} style={{ color: stat.color }} />
                <p className="text-[8px] text-white/30">{stat.label}</p>
              </div>
              <p className="text-sm font-bold text-white">{stat.value}</p>
              <p className="text-[8px] font-semibold" style={{ color: stat.color }}>{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
