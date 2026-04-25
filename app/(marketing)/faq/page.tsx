'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'How does AI generate replies?',
    a: 'It analyzes incoming messages, identifies intent, and generates relevant responses based on your configured business persona and tone.'
  },
  {
    q: 'Can I customize replies?',
    a: 'Yes, you can adjust tone, content, and behavior inside your Settings dashboard to ensure the AI speaks exactly like your brand.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, all data is encrypted and protected. We do not use your private conversation data to train public models.'
  },
  {
    q: 'Do I need technical knowledge?',
    a: 'No, setup is simple and guided. You can connect Gmail, WhatsApp, and Instagram with just a few clicks without writing any code.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-[70vh]">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-6"
        >
          Frequently Asked Questions
        </motion.h1>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-medium text-lg">{faq.q}</span>
              <ChevronDown 
                className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#00D4FF]' : 'text-gray-500'}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 text-gray-400">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
