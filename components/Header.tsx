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
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-6 left-1/2 z-50 w-full max-w-5xl px-4 transition-all duration-500`}
      >
        <div className={`flex items-center justify-between mx-auto transition-all duration-500 ${
          scrolled 
            ? 'bg-[#111111]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-3 px-6 rounded-full' 
            : 'bg-transparent py-4 px-2'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Light Mode Logo */}
            <img 
              src="/logo.png" 
              alt="Sandesh AI" 
              className="h-6 md:h-10 dark:hidden group-hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
            />
            {/* Dark Mode Logo */}
            <img 
              src="/logo-white.png" 
              alt="Sandesh AI" 
              className="h-6 md:h-10 hidden dark:block group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(0,212,255,0.4)]" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Nav (Auth) */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-full transition-colors hover:bg-white/5">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-semibold text-black bg-white hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Sign up
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
