'use client'

import { useState, useEffect } from 'react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect to test the AI capabilities.',
    badge: null,
    features: [
      '100 AI Replies/month',
      '1 workspace',
      'Basic Inbox UI',
      'Community Support',
    ],
    cta: 'Current Plan',
    highlight: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '₹2,900',
    period: '/month',
    description: 'For growing teams starting to automate.',
    badge: '🚀 Most Popular',
    features: [
      '1,000 AI Replies/month',
      'Unlimited workspaces',
      'Gmail Integration',
      'Priority Support',
      'AI Lead Scoring',
    ],
    cta: 'Upgrade to Starter',
    highlight: true,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹9,900',
    period: '/month',
    description: 'High volume inbox automation.',
    badge: null,
    features: [
      '5,000 AI Replies/month',
      'Everything in Starter',
      'Custom AI Persona Training',
      'Dedicated Account Manager',
      'SLA Guarantee',
    ],
    cta: 'Upgrade to Growth',
    highlight: false,
  },
]

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setCurrentPlan(data.user?.plan || 'free')
      }
      setLoading(false)

      // Load Razorpay Script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      document.body.appendChild(script)
    }
    loadUser()
  }, [])

  const handleUpgrade = async (planId: string) => {
    if (planId === currentPlan) return
    if (planId === 'free') {
      alert('To downgrade, please contact support.')
      return
    }

    setUpgrading(planId)

    try {
      // 1. Create order on server
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      
      const orderData = await res.json()

      if (!res.ok) throw new Error(orderData.error || 'Failed to create order')

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Use your public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sandesh AI',
        description: `${planId.toUpperCase()} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: planId,
            }),
          })

          const verifyData = await verifyRes.json()
          if (verifyRes.ok && verifyData.success) {
            alert('Payment successful! Plan upgraded.')
            setCurrentPlan(planId)
          } else {
            alert('Payment verification failed.')
          }
        },
        prefill: {
          name: 'Sandesh User',
          email: 'user@example.com',
        },
        theme: {
          color: '#7c3aed',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description)
      })
      rzp.open()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUpgrading(null)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="pricing-page fade-in">
      <div className="pricing-header">
        <div className="badge badge-primary" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          ⚡ Upgrade your workflow
        </div>
        <h1 className="pricing-title">
          Scale with <span className="gradient-text">Sandesh AI</span>
        </h1>
        <p className="pricing-subtitle">
          Start free. Upgrade when your inbox volume grows. Pay securely via Razorpay.
        </p>
      </div>

      <div className="plans-grid">
        {PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.id
          return (
            <div key={plan.id} className={`plan-card ${plan.highlight ? 'plan-highlight' : ''}`}>
              {plan.badge && (
                <div className="plan-badge">{plan.badge}</div>
              )}
              {isCurrent && !plan.badge && (
                <div className="plan-badge" style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)' }}>
                  ✓ Your Plan
                </div>
              )}

              <div className="plan-header">
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  <span className="plan-price-amount">{plan.price}</span>
                  <span className="plan-price-period">{plan.period}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-divider" />

              <ul className="plan-features">
                {plan.features.map((feat) => (
                  <li key={feat} className="plan-feature">
                    <span className="plan-feature-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                {isCurrent ? (
                  <button className="btn btn-secondary w-full" disabled style={{ justifyContent: 'center', cursor: 'default', opacity: 0.7 }}>
                    ✓ Current Plan
                  </button>
                ) : (
                  <button
                    className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} w-full`}
                    style={{ justifyContent: 'center' }}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={upgrading !== null}
                  >
                    {upgrading === plan.id ? <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> : plan.cta}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        /* Pricing UI styles preserved */
        .pricing-page { padding: 2.5rem 2rem; max-width: 1100px; margin: 0 auto; }
        .pricing-header { text-align: center; margin-bottom: 3rem; }
        .pricing-title { font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; }
        .pricing-subtitle { font-size: 1rem; color: var(--color-text-secondary); max-width: 480px; margin: 0 auto; line-height: 1.7; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: start; margin-bottom: 3rem; }
        @media (max-width: 900px) { .plans-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; } }
        .plan-card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: 1.75rem; display: flex; flex-direction: column; position: relative; transition: border-color var(--transition-base), transform var(--transition-base); }
        .plan-card:hover { border-color: var(--color-border-strong); transform: translateY(-4px); }
        .plan-highlight { background: linear-gradient(160deg, var(--color-bg-elevated), var(--color-bg-card)); border-color: var(--color-primary); box-shadow: 0 0 40px rgba(124,58,237,0.15); }
        .plan-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--color-primary), var(--color-accent)); color: white; font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.875rem; border-radius: var(--radius-full); white-space: nowrap; }
        .plan-header { margin-bottom: 1.25rem; }
        .plan-name { font-size: 0.875rem; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; }
        .plan-price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.75rem; }
        .plan-price-amount { font-size: 2.5rem; font-weight: 800; color: var(--color-text-primary); line-height: 1; }
        .plan-price-period { font-size: 0.875rem; color: var(--color-text-muted); }
        .plan-description { font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.6; }
        .plan-divider { height: 1px; background: var(--color-border); margin: 1.25rem 0; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.625rem; flex: 1; }
        .plan-feature { display: flex; align-items: center; gap: 0.625rem; font-size: 0.875rem; color: var(--color-text-secondary); }
        .plan-feature-check { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: var(--color-success-dim); color: var(--color-success); flex-shrink: 0; }
      `}</style>
    </div>
  )
}
