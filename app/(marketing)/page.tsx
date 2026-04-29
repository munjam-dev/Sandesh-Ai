'use client'

import HeroSection from '@/components/HeroSection'
import MarqueeBanner from '@/components/MarqueeBanner'
import BentoSection from '@/components/BentoSection'
import ProductShowcase from '@/components/ProductShowcase'
import IntegrationsSection from '@/components/IntegrationsSection'
import AutomationSection from '@/components/AutomationSection'
import Testimonials from '@/components/Testimonials'
import PricingSection from '@/components/PricingSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Marquee */}
      <MarqueeBanner />

      {/* 3. Bento Features */}
      <BentoSection />

      {/* 4. Product Showcase */}
      <ProductShowcase />

      {/* 5. Integrations + Trust */}
      <IntegrationsSection />

      {/* 6. Automation Workflow */}
      <AutomationSection />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Pricing */}
      <PricingSection />

      {/* 9. CTA */}
      <CTASection />
    </div>
  )
}
