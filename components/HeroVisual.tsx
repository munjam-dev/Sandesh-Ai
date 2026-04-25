'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'

export default function HeroVisual() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      
      {/* Background Glowing Gradient */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/30 to-[#00D4FF]/30 rounded-full blur-[80px] -z-10"
      />

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 -z-0 overflow-hidden rounded-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/40 blur-[1px]"
            initial={{ 
              x: Math.random() * 400 - 200, 
              y: Math.random() * 400 - 200,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              x: [null, Math.random() * 50 - 25],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* The Hero Image with Parallax & Float */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
        }}
        className="relative w-full h-full z-10 perspective-[1000px]"
      >
        <motion.div
          animate={{ 
            rotateX: mousePosition.y * -15, // Tilt based on mouse Y
            rotateY: mousePosition.x * 15,  // Tilt based on mouse X
            y: [0, -15, 0], // Floating effect
          }}
          transition={{ 
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotateX: { type: "spring", stiffness: 75, damping: 15 },
            rotateY: { type: "spring", stiffness: 75, damping: 15 }
          }}
          className="w-full h-full relative flex items-center justify-center transform-style-3d group"
        >
          {/* Main Image */}
          <div className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,102,255,0.3)] transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(0,212,255,0.4)] group-hover:scale-[1.02]">
            <Image
              src="/hero-image.png"
              alt="Sandesh AI Dashboard"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Glassmorphic Overlay Card */}
          <motion.div 
            className="absolute -bottom-6 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-4 translate-z-[50px]"
            animate={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Reply Sent</p>
              <p className="text-xs text-[#00D4FF]">Just now</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
