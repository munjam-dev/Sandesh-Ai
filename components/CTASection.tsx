'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Bot, Sparkles } from 'lucide-react'

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Parallax for background watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const watermarkX = useTransform(scrollYProgress, [0, 1], [100, -100])
  
  // Cursor spotlight effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 md:py-40 px-6 overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      {/* Background Polish & Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-fuchsia-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
      </div>

      {/* Giant Watermark Text */}
      <motion.div 
        style={{ x: watermarkX }}
        className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none opacity-[0.03]"
      >
        <h2 className="text-[25vw] font-black whitespace-nowrap bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
          Sandesh AI
        </h2>
      </motion.div>

      {/* Cursor Spotlight */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.05), transparent 40%)`
          )
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* TOP VISUAL: Floating AI Icon */}
        <div className="relative mb-12 flex flex-col items-center">
          {/* Curved Animated Line */}
          <svg className="absolute -top-12 w-[300px] h-[100px] pointer-events-none opacity-20" viewBox="0 0 300 100">
            <motion.path
              d="M0,50 Q150,0 300,50"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Moving Particle on Path */}
            <motion.circle r="1" fill="white">
              <animateMotion dur="4s" repeatCount="indefinite" path="M0,50 Q150,0 300,50" />
            </motion.circle>
          </svg>

          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-fuchsia-500 blur-2xl opacity-40 scale-150 animate-pulse" />
            
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 p-0.5 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full rounded-[22px] bg-black flex items-center justify-center">
                <Bot size={32} className="text-white" />
              </div>
            </div>
            
            {/* Floating Sparkles */}
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-fuchsia-400"
            >
              <Sparkles size={16} />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">AI-Powered Assistant</span>
          </motion.div>
        </div>

        {/* CENTER: CINEMATIC HEADLINE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] text-white max-w-4xl">
            Ready to Automate Every <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Customer Conversation?
            </span>
          </h2>
        </motion.div>

        {/* BOTTOM: SUBTITLE & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-xl leading-relaxed">
            Join the elite 500+ businesses who have already transcended manual messaging. Experience the future of growth today.
          </p>

          <div className="relative group">
            {/* Button Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            
            <Link
              href="/signup"
              className="relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
          </div>

          <p className="mt-8 text-white/40 text-sm font-medium tracking-wide">
            Launch your AI Assistant in less than 2 minutes.
          </p>
        </motion.div>

      </div>

      {/* Ambient moving light sweep */}
      <motion.div 
        animate={{ 
          x: ['-100%', '200%'],
          opacity: [0, 0.2, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "linear",
          delay: 1
        }}
        className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent -rotate-12 pointer-events-none"
      />
    </section>
  )
}
