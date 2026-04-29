'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import HeroVisual from './HeroVisual'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 500], [0, 50])
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-32 pb-24 md:py-32 overflow-hidden"
    >
      {/* Background Polish */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      {/* Cinematic Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(0,102,255,0.03), transparent 40%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: CONTENT */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold tracking-wide uppercase mb-8">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              Trusted by 500+ businesses
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white mb-8 max-w-xl">
              Turn Every <br />
              <span className="text-blue-500">Conversation</span> <br />
              Into Revenue
            </h1>

            <p className="text-lg text-white/70 mb-12 max-w-md leading-relaxed">
              AI-powered replies, automation, and campaigns across WhatsApp, Email, and Instagram. Respond instantly and never lose a lead again.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-black rounded-xl font-semibold text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium text-base transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={12} className="fill-white ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
