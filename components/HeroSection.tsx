'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import HeroVisual from './HeroVisual'

export default function HeroSection() {
  const { scrollY } = useScroll()
  
  // Parallax effects for text and image
  const textY = useTransform(scrollY, [0, 800], [0, 150])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0])
  
  const imageScale = useTransform(scrollY, [0, 800], [1, 1.05])
  const imageY = useTransform(scrollY, [0, 800], [0, -50])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.03), transparent 40%)`
        }}
      />

      {/* Very subtle ambient glow instead of hard radial gradient */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none -z-20" />

      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center relative z-10">
        
        {/* Top Text Content */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center text-center w-full max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="text-white" />
            <span>Sandesh AI 2.0 is live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-[5.5rem] lg:text-[7rem] leading-[0.9] font-bold tracking-tighter mb-8 text-white"
          >
            Turn every message <br className="hidden md:block" />
            <span className="text-white/80">into a customer.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            AI-powered replies across WhatsApp, Email, and Instagram. Respond instantly and never lose a lead again.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto"
          >
            <Link 
              href="/signup" 
              className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10">Start for free</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#demo" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-medium transition-all backdrop-blur-md text-center"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom Massive Visual Container */}
        <motion.div 
          style={{ scale: imageScale, y: imageY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mt-16 md:mt-24 relative flex justify-center perspective-[2000px]"
        >
          {/* A glassmorphic frame to house the HeroVisual to make it look like a floating app window */}
          <div className="w-full max-w-5xl rounded-3xl md:rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-2 md:p-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
            <div className="relative w-full aspect-video rounded-2xl md:rounded-[32px] overflow-hidden bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
