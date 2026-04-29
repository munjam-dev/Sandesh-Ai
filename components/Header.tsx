'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6"
      >
        <div className={`w-full max-w-7xl transition-all duration-500 rounded-full border border-white/5 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-8 py-3'
            : 'bg-transparent px-8 py-4'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo Left Aligned */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img
                src="/logo-white.svg"
                alt="Sandesh Ai"
                className="h-7 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Nav Links Centered */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            {/* CTA Right Aligned */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-black bg-white hover:bg-white/90 px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-8 gap-6"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-bold text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link href="/login" className="text-xl font-medium text-white/60">Log in</Link>
              <Link href="/signup" className="text-xl font-bold text-white bg-white/10 py-4 text-center rounded-2xl">Get Started Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
