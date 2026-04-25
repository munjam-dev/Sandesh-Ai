'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronUp } from 'lucide-react'

export default function BentoSection() {
  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px] auto-rows-fr">
          
          {/* Left Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-gradient-to-br from-[#1B0B47] via-[#0033CC] to-[#0088FF] p-10 md:p-12 relative overflow-hidden flex flex-col justify-between group h-full min-h-[400px]"
          >
            {/* Abstract Background Elements */}
            <div className="absolute -bottom-20 -right-20 w-[120%] h-[120%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-1/4 -right-1/4 w-[80%] h-[80%] bg-[#00D4FF]/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-1/4 left-1/4 w-[80%] h-[80%] bg-[#0066FF]/50 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Next-Gen AI to <br className="hidden md:block"/> Elevate Your Conversions
              </h2>
              <p className="text-lg text-white/80 max-w-md leading-relaxed font-medium">
                AI-powered messaging offers a bunch of benefits that can save time, boost replies, and make your sales strategy way more efficient.
              </p>
            </div>
            
            <div className="relative z-10 mt-16">
              <button className="px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-md text-sm tracking-wide">
                DISCOVER MORE
              </button>
            </div>

            {/* Bottom Right Cutout */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#050505] rounded-tl-[2rem] flex items-center justify-center z-20">
              {/* Inverse corners */}
              <div className="absolute -top-6 right-0 w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[10px_10px_0_0_#050505]" />
              <div className="absolute bottom-0 -left-6 w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[10px_10px_0_0_#050505]" />
              
              <button className="w-16 h-16 bg-[#0A1F44] hover:bg-[#0066FF] rounded-[1.2rem] flex items-center justify-center text-white transition-all hover:scale-105 shadow-lg group-hover:shadow-[#0066FF]/30">
                <ArrowUpRight size={28} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

          {/* Middle Column (Two stacked cards) */}
          <div className="md:col-span-1 md:row-span-2 flex flex-col gap-6">
            
            {/* Top Middle Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-[2rem] bg-gradient-to-br from-[#E8E8FF] to-[#F3F0FF] p-8 relative overflow-hidden flex flex-col justify-end group min-h-[280px]"
            >
              {/* Abstract Glass shapes representation */}
              <div className="absolute -top-12 -right-8 w-40 h-40 bg-gradient-to-br from-[#0066FF]/10 to-[#D400FF]/10 rounded-full blur-2xl" />
              <div className="absolute top-4 right-4 w-24 h-24 border border-white/40 bg-white/20 backdrop-blur-sm rounded-xl transform rotate-12 group-hover:rotate-6 transition-transform duration-500 shadow-xl" />
              <div className="absolute top-12 right-16 w-20 h-20 border border-white/40 bg-white/30 backdrop-blur-md rounded-xl transform -rotate-12 group-hover:-rotate-6 transition-transform duration-500 shadow-xl" />

              <div className="relative z-10 mt-auto">
                <div className="text-5xl md:text-6xl font-black text-[#0A1F44] mb-2 tracking-tight">+100k</div>
                <div className="text-xl text-[#0A1F44]/80 font-semibold leading-tight">
                  Leads Converted<br/>Successfully
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Middle Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 rounded-[2rem] bg-black p-8 relative overflow-hidden flex flex-col justify-end border border-white/10 group min-h-[280px]"
            >
              {/* 3D Spiral Illusion via CSS */}
              <div className="absolute -top-12 -right-12 w-64 h-64 opacity-80 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 border-[16px] border-[#0066FF] rounded-full transition-transform duration-700 ease-out shadow-[inset_0_0_20px_rgba(0,102,255,0.5)]"
                    style={{
                      transform: `rotate(45deg) scale(${1 + i * 0.15}) translateX(${i * -10}px) translateY(${i * 10}px)`,
                      borderColor: `rgba(0, 102, 255, ${1 - i * 0.15})`
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 mt-auto">
                <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">+1M</div>
                <div className="text-xl text-white/80 font-semibold leading-tight">
                  Messages<br/>Automated
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Tall Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-2 rounded-[2rem] bg-gradient-to-b from-[#DFDFFF] via-[#EAE8FF] to-[#F8F5FF] p-8 md:p-10 relative flex flex-col justify-between group h-full min-h-[500px]"
          >
            {/* Top Right Cutout */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#050505] rounded-bl-[2rem] flex items-start justify-end z-20">
              {/* Inverse corners */}
              <div className="absolute bottom-0 -right-6 w-6 h-6 bg-transparent rounded-tr-[1.5rem] shadow-[10px_-10px_0_0_#050505]" />
              <div className="absolute -bottom-6 right-0 w-6 h-6 bg-transparent rounded-tr-[1.5rem] shadow-[10px_-10px_0_0_#050505]" />
              
              <button className="w-16 h-16 bg-[#0A1F44] hover:bg-[#0066FF] rounded-[1.2rem] flex items-center justify-center text-white transition-all hover:scale-105 shadow-lg mt-0 mr-0">
                <ArrowUpRight size={28} strokeWidth={2.5} />
              </button>
            </div>

            <div className="relative z-10 mt-28 md:mt-32">
              {/* Avatars */}
              <div className="flex -space-x-3 mb-8">
                <img src="https://i.pravatar.cc/100?img=33" alt="User 1" className="w-14 h-14 rounded-full border-[3px] border-white object-cover shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=47" alt="User 2" className="w-14 h-14 rounded-full border-[3px] border-white object-cover shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User 3" className="w-14 h-14 rounded-full border-[3px] border-white object-cover shadow-sm" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-6 leading-[1.1] tracking-tight">
                AI <br /> Innovation <br /> Globally <br /> Proven
              </h3>
              <p className="text-[#0A1F44]/70 font-semibold text-lg leading-relaxed">
                Used by 1,000+ businesses around the world.
              </p>
            </div>

            <div className="relative z-10 mt-12 flex justify-between items-center gap-2">
              <button className="flex-1 py-3.5 rounded-full border border-[#0066FF]/30 text-[#0066FF] font-bold hover:bg-[#0066FF]/10 transition-colors text-xs tracking-wider uppercase">
                Discover More
              </button>
              <button className="w-12 h-12 shrink-0 rounded-[1rem] border border-[#0066FF]/30 text-[#0066FF] flex items-center justify-center hover:bg-[#0066FF]/10 transition-colors">
                <ChevronUp size={24} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
