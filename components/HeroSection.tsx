'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Play, Star, Globe } from 'lucide-react'
import HeroVisual from './HeroVisual'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 500], [0, 40])
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const bgY = useTransform(scrollY, [0, 500], [0, -80])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Light sweep animation position
  const lightX = useTransform(smoothMouseX, (v) => v - 400)
  const lightY = useTransform(smoothMouseY, (v) => v - 400)

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#050507]"
    >
      {/* Deep background layer */}
      <motion.div className="absolute inset-0 -z-30" style={{ y: bgY }}>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-600/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-indigo-600/[0.04] blur-[100px]" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-blue-500/[0.03] blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[60%] right-[25%] w-[250px] h-[250px] rounded-full bg-cyan-500/[0.03] blur-[80px]"
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic cursor spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) =>
              `radial-gradient(700px circle at ${x}px ${y}px, rgba(0,102,255,0.04), transparent 50%)`
          ),
        }}
      />

      {/* Cinematic light sweep (follows cursor) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] opacity-30"
        style={{
          x: lightX,
          y: lightY,
          background:
            'radial-gradient(ellipse 800px 400px at center, rgba(0,102,255,0.03), transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full pt-32 pb-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: CONTENT */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Trust badge */}
            <motion.div
              variants={itemVariants}
              className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8 hover:border-white/20 transition-all duration-500 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white/60 text-xs font-medium tracking-wide">
                Trusted by growing businesses worldwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.5rem] font-semibold leading-[1.08] tracking-tight text-white mb-6 max-w-2xl"
            >
              Turn Every{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Conversation
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <br />
              Into Revenue
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/50 mb-10 max-w-lg leading-relaxed"
            >
              AI-powered replies, automation, and campaigns across{' '}
              <span className="text-white/80 font-medium">WhatsApp</span>,{' '}
              <span className="text-white/80 font-medium">Email</span>, and{' '}
              <span className="text-white/80 font-medium">Instagram</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA - magnetic glow */}
              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.35)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] overflow-hidden"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Start Free Trial</span>
                <ArrowRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#demo"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-white/80 hover:text-white rounded-2xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center transition-colors duration-300">
                  <Play size={12} className="fill-white ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-5"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border border-[#050507] bg-gradient-to-br from-blue-600/30 to-cyan-500/20 flex items-center justify-center"
                  >
                    <span className="text-[8px] font-bold text-white/60">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-white/40 ml-1">
                  4.9/5 from 200+ reviews
                </span>
              </div>
            </motion.div>

            {/* Platform icons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4 text-white/20"
            >
              <span className="text-[10px] uppercase tracking-widest font-medium">
                Integrates with
              </span>
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-white/30" />
                <span className="text-[10px]">WhatsApp</span>
                <span className="text-[10px]">Email</span>
                <span className="text-[10px]">Instagram</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

