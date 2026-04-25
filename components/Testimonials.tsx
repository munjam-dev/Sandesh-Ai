'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Rahul Mehta',
    role: 'Founder, GrowthStack',
    content: 'Before Sandesh AI, we were missing a lot of inbound leads because replies weren’t instant. After using it, our response time dropped to seconds and we’ve already seen a noticeable increase in conversions. It feels like having a sales assistant working 24/7.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Anjali Verma',
    role: 'CEO, PixelCraft Agency',
    content: 'We manage multiple client inquiries daily across WhatsApp and email. Sandesh AI simplified everything into one dashboard and the AI replies are surprisingly accurate. It has reduced our manual workload by at least 60%.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    name: 'Arjun Reddy',
    role: 'Owner, UrbanCart',
    content: 'Customers expect instant replies, especially on Instagram. Sandesh AI helped us automate responses without sounding robotic. Our customer engagement has improved significantly.',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Sneha Kapoor',
    role: 'Marketing Consultant',
    content: 'I used to spend hours replying to repetitive queries. Now AI handles most of it, and I just review important conversations. It saves me time and helps me focus on actual work.',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    name: 'Karthik Iyer',
    role: 'Founder, SaaSFlow',
    content: 'The lead qualification feature is a game changer. Instead of replying to everyone manually, I now focus only on high-intent leads. This has improved our conversion efficiency a lot.',
    avatar: 'https://i.pravatar.cc/150?img=15'
  },
  {
    name: 'Mohammed Imran',
    role: 'Owner, Imran Services',
    content: 'We get a lot of inquiries through WhatsApp. Earlier, many customers didn’t get replies on time. With Sandesh AI, every message gets an instant response, and we’ve seen more bookings.',
    avatar: 'https://i.pravatar.cc/150?img=52'
  },
  {
    name: 'Priya Sharma',
    role: 'Growth Lead, ScaleUp Labs',
    content: 'The automation workflows are incredibly useful. Setting up follow-ups and campaigns has never been easier. It’s like combining CRM + AI + automation into one tool.',
    avatar: 'https://i.pravatar.cc/150?img=44'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {/* Trust Boost */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-sm font-semibold text-white/60 tracking-wider uppercase">Trusted by 500+ businesses</p>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white"
          >
            Respond <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D4FF]">5x faster</span> with AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            See how forward-thinking businesses are transforming their customer communication.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid rounded-3xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-md hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,102,255,0.1)] relative"
            >
              {/* Subtle top gradient glow on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
