'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

// Declare the Razorpay window object for TS
declare global {
  interface Window {
    Razorpay: any
  }
}

interface CheckoutButtonProps {
  plan: string
  priceText: string
  className?: string
}

export default function CheckoutButton({ plan, priceText, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    setLoading(true)

    try {
      // 1. Load the script
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        alert('Failed to load Razorpay SDK. Please check your connection.')
        setLoading(false)
        return
      }

      // 2. Call backend to create order
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json()

      if (res.status === 401) {
        // User not logged in
        router.push(`/login?redirect=/pricing`)
        setLoading(false)
        return
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      const { orderId, amount, currency } = data

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: amount.toString(),
        currency: currency,
        name: 'Sandesh AI',
        description: `Upgrade to ${plan} plan`,
        order_id: orderId,
        handler: async function (response: any) {
          // 4. Verify payment on success
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                plan,
              }),
            })
            
            const verifyData = await verifyRes.json()
            if (verifyRes.ok) {
              alert('Payment successful! Your plan has been upgraded.')
              router.push('/dashboard')
            } else {
              alert(`Payment verification failed: ${verifyData.error}`)
            }
          } catch (err) {
            alert('Payment verification error')
          }
        },
        theme: {
          color: '#0066FF',
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`)
      })
      paymentObject.open()

    } catch (error: any) {
      alert(error.message || 'Something went wrong during checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : null}
      {loading ? 'Processing...' : `Get ${priceText}`}
    </button>
  )
}
