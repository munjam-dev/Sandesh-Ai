'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const FOOTER_LINKS = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'User Agreement', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#050505]/80 backdrop-blur-xl border-t border-white/10 pt-20 pb-10 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#0066FF]/5 to-transparent blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section - Brand */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer inline-block"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 relative z-10">
              <span className="bg-gradient-to-r from-[#0A1F44] via-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]">
                Sandesh AI
              </span>
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-500 -z-10" />
          </motion.div>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-md mx-auto">
            AI-powered communication platform to connect, engage, and convert.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-20">
          {[
            { title: 'Product', links: FOOTER_LINKS.product },
            { title: 'Company', links: FOOTER_LINKS.company },
            { title: 'Support', links: FOOTER_LINKS.support },
            { title: 'Legal', links: FOOTER_LINKS.legal },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col md:items-start items-center text-center md:text-left"
            >
              <h3 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors relative group inline-block text-sm"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#0066FF] to-[#00D4FF] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-gray-500">
          <p className="mb-4 md:mb-0">© 2026 Sandesh AI. All rights reserved.</p>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <a href="mailto:sandesh.ai.info@gmail.com" aria-label="Email Support">
              sandesh.ai.info@gmail.com
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </footer>
  )
}
