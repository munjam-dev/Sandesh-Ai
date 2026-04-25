'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Bot, Sparkles } from 'lucide-react'
import HeroVisual from './HeroVisual'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 102, 255, 0.08), transparent 40%)`
        }}
      />

      {/* Animated gradient background shift */}
      <div className="absolute top-0 left-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0066FF]/10 via-[#000000] to-[#000000] -z-20 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10 py-20">
        
        {/* Left Content (Text) */}
        <motion.div 
          style={{ y: y1, opacity: opacity1 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <Sparkles size={14} className="text-[#00D4FF]" />
            <span>Sandesh AI 2.0 is live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-semibold leading-tight tracking-tighter mb-6"
          >
            Turn every message into a <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,102,255,0.4)]">
              customer
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed"
          >
            AI-powered replies across WhatsApp, Email, and Instagram. Respond instantly and never lose a lead again.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full sm:w-auto"
          >
            <Link 
              href="/signup" 
              className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              href="#demo" 
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-full font-semibold transition-all backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center"
            >
              View Demo
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-gray-500 font-medium"
          >
            No credit card required · Setup in minutes
          </motion.p>
        </motion.div>

        {/* Right Content (Visual Animation) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex justify-center items-center relative"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        .animate-typing {
          animation: typing 3s steps(40, end) infinite;
        }
      `}</style>
    </section>
  )
}
