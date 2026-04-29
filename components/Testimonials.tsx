'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Founder, StyleHive',
    avatar: 'AS',
    text: 'Sandesh AI completely transformed how we handle customer inquiries. Our WhatsApp response time went from hours to seconds.',
    color: 'blue'
  },
  {
    name: 'Rahul Verma',
    role: 'CEO, GrowthHackers',
    avatar: 'RV',
    text: 'The HOT lead notifications alone are worth the subscription. We never miss a high-intent customer anymore.',
    color: 'purple'
  },
  {
    name: 'Priya Nair',
    role: 'Marketing Lead, ZenShop',
    avatar: 'PN',
    text: 'The unified inbox is a game-changer. Our team now handles 3x the volume without hiring more people.',
    color: 'emerald'
  },
  {
    name: 'Amit Desai',
    role: 'Co-founder, FinEdge',
    avatar: 'AD',
    text: 'Setup was literally 5 minutes. Connected our WhatsApp and the AI was live instantly.',
    color: 'orange'
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Loved by 500+ businesses
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Join the community of businesses automating their growth with Sandesh AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative p-8 md:p-12 rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 group overflow-hidden"
            >
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              
              {/* Subtle Gradient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-blue-500 mr-1 text-xs">★</span>
                  ))}
                </div>
                <p className="text-xl text-white/90 leading-relaxed mb-10 font-medium italic">
                  "{t.text}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-lg group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-500`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{t.name}</h4>
                  <p className="text-sm text-white/40 font-medium uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
