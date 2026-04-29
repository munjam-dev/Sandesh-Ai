'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Clock, ShieldCheck, Loader2, Send } from 'lucide-react'
import HeroVisual from '@/components/HeroVisual'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#0066FF]/10 to-transparent blur-[120px] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto">
        {/* Top Hero Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Let’s build smarter communication <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">together</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Have questions, ideas, or need help getting started? We’re here to support you every step of the way.
          </motion.p>
        </div>

        {/* Main Section (2-column layout) */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF]/30 to-[#00D4FF]/30 rounded-3xl blur-xl opacity-50 pointer-events-none" />
            
            <div className="relative bg-[#050505]/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <h2 className="text-2xl font-bold mb-8 text-white">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">How can we help?</label>
                  <textarea 
                    id="message"
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all resize-none" 
                    placeholder="Tell us about your project or inquiry..." 
                  />
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center"
                    >
                      Your message has been sent successfully. We will get back to you shortly.
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="submit"
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>

              {/* Trust Elements */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-[#00D4FF]" />
                <span>Your information is secure and will not be shared. We respect your privacy.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12 relative z-10">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-[#0066FF] mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">Email Us</h3>
                <a href="mailto:sandesh.ai.info@gmail.com" className="text-gray-400 hover:text-[#00D4FF] transition-colors text-sm break-all">
                  sandesh.ai.info@gmail.com
                </a>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] mb-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">Response Time</h3>
                <p className="text-gray-400 text-sm">
                  We usually respond within 24 hours
                </p>
              </div>
            </div>

            {/* Visual Element Container */}
            <div className="flex-1 relative min-h-[300px] md:min-h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-[#050505]/40 flex items-center justify-center">
                <HeroVisual />
              
              {/* Optional overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              
              <div className="relative z-10 text-center px-6">
                <h3 className="text-2xl font-black text-white/90 drop-shadow-md">Global Support</h3>
                <p className="text-[#00D4FF] text-sm font-medium mt-2 drop-shadow-sm">Operating worldwide, 24/7</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
