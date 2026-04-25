'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronUp } from 'lucide-react'

export default function BentoSection() {
  return (
    <section className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Built for conversion.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Everything you need to capture, engage, and convert leads into loyal customers instantly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px] auto-rows-fr">
          
          {/* Left Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 rounded-[32px] bg-[#0A0A0A] border border-white/10 p-10 md:p-12 relative overflow-hidden flex flex-col justify-between group h-full min-h-[400px] shadow-[0_0_40px_rgba(255,255,255,0.02)]"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1] tracking-tighter">
                Next-Gen AI <br className="hidden md:block"/> for Conversions
              </h2>
              <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                AI-powered messaging offers a bunch of benefits that can save time, boost replies, and make your sales strategy way more efficient.
              </p>
            </div>
            
            <div className="relative z-10 mt-16">
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md text-sm">
                Discover Features
              </button>
            </div>

            {/* Bottom Right Cutout */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#050505] rounded-tl-[32px] flex items-center justify-center z-20">
              {/* Inverse corners */}
              <div className="absolute -top-6 right-0 w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[10px_10px_0_0_#050505]" />
              <div className="absolute bottom-0 -left-6 w-6 h-6 bg-transparent rounded-br-[1.5rem] shadow-[10px_10px_0_0_#050505]" />
              
              <button className="w-16 h-16 bg-white hover:bg-gray-200 rounded-[20px] flex items-center justify-center text-black transition-all hover:scale-105 shadow-lg">
                <ArrowUpRight size={28} strokeWidth={2} />
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
              className="flex-1 rounded-[32px] bg-[#111] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-end group min-h-[280px]"
            >
              <div className="relative z-10 mt-auto">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">+100k</div>
                <div className="text-lg text-gray-400 font-medium leading-tight">
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
              className="flex-1 rounded-[32px] bg-[#0A0A0A] border border-white/10 p-8 relative overflow-hidden flex flex-col justify-end group min-h-[280px]"
            >
              <div className="relative z-10 mt-auto">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">+1M</div>
                <div className="text-lg text-gray-400 font-medium leading-tight">
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
            className="md:col-span-1 md:row-span-2 rounded-[32px] bg-[#111] border border-white/5 p-8 md:p-10 relative flex flex-col justify-between group h-full min-h-[500px]"
          >
            {/* Top Right Cutout */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#050505] rounded-bl-[32px] flex items-start justify-end z-20">
              {/* Inverse corners */}
              <div className="absolute bottom-0 -right-6 w-6 h-6 bg-transparent rounded-tr-[1.5rem] shadow-[10px_-10px_0_0_#050505]" />
              <div className="absolute -bottom-6 right-0 w-6 h-6 bg-transparent rounded-tr-[1.5rem] shadow-[10px_-10px_0_0_#050505]" />
              
              <button className="w-16 h-16 bg-white hover:bg-gray-200 rounded-[20px] flex items-center justify-center text-black transition-all hover:scale-105 shadow-lg mt-0 mr-0">
                <ArrowUpRight size={28} strokeWidth={2} />
              </button>
            </div>

            <div className="relative z-10 mt-28 md:mt-32">
              {/* Avatars */}
              <div className="flex -space-x-3 mb-8">
                <img src="https://i.pravatar.cc/100?img=33" alt="User 1" className="w-14 h-14 rounded-full border-[3px] border-[#111] object-cover shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=47" alt="User 2" className="w-14 h-14 rounded-full border-[3px] border-[#111] object-cover shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User 3" className="w-14 h-14 rounded-full border-[3px] border-[#111] object-cover shadow-sm" />
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tighter">
                Globally <br /> Proven <br /> Results
              </h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Trusted by 1,000+ businesses worldwide.
              </p>
            </div>

            <div className="relative z-10 mt-12 flex justify-between items-center gap-2">
              <button className="flex-1 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors text-sm">
                View Studies
              </button>
              <button className="w-12 h-12 shrink-0 rounded-[18px] border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronUp size={24} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
