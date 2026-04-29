'use client'

import { motion } from 'framer-motion'

const INTEGRATIONS = [
  { name: 'WhatsApp', icon: '📱', color: '#25D366' },
  { name: 'Gmail', icon: '📧', color: '#EA4335' },
  { name: 'Instagram', icon: '📷', color: '#E1306C' },
  { name: 'Shopify', icon: '🛒', color: '#95BF47' },
  { name: 'Razorpay', icon: '💳', color: '#3395FF' },
  { name: 'Zapier', icon: '⚡', color: '#FF4A00' },
  { name: 'Slack', icon: '💬', color: '#4A154B' },
  { name: 'HubSpot', icon: '🎯', color: '#FF7A59' },
]

export default function IntegrationsSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4 block">Integrations</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Connects with your entire stack
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Plug into your existing tools in minutes. No complex engineering required.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {INTEGRATIONS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all cursor-default overflow-hidden"
            >
              {/* Texture */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
              
              <div 
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 border transition-all duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }}
              >
                {item.icon}
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: item.color }} />
              </div>
              <span className="relative z-10 text-xs font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Stats bar with texture and gradients */}
        <div className="relative mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8 p-12 rounded-[40px] bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
          
          {[
            { value: '500+', label: 'Happy Customers' },
            { value: '10M+', label: 'Messages Sent' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '< 1s', label: 'Response Time' },
          ].map((stat, i) => (
            <div key={i} className="relative z-10 text-center">
              <p className="text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</p>
              <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
