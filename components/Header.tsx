'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll to add background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,212,255,0.4)]">
              <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                <path d="M6 10h24M6 18h16M6 26h20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="29" cy="26" r="6" fill="#fff"/>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all">
              Sandesh AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-2 py-1 text-sm font-medium rounded-full transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Nav (Auth) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
              Login
            </Link>
            <Link href="/signup" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-black/80 px-5 py-2 rounded-full backdrop-blur-sm transition-all group-hover:bg-transparent">
                <span className="text-sm font-medium text-white group-hover:text-white">Get Started</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 top-0 z-40 bg-[#050505]/95 backdrop-blur-xl md:hidden pt-24 px-6 overflow-hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 items-center mt-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-bold ${pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4 mt-8 w-full border-t border-white/10 pt-8"
              >
                <Link href="/login" className="text-lg font-medium text-gray-300 hover:text-white w-full text-center py-3 rounded-xl hover:bg-white/5 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="text-lg font-medium bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white w-full text-center py-3 rounded-xl shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                  Get Started for Free
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
