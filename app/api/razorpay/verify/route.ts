export const runtime = 'nodejs';
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    plan: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Verify signature
  const bodyString = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
    .update(bodyString.toString())
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Update user plan in database
  const { error: updateError } = await supabase
    .from('users')
    .update({ plan })
    .eq('id', user.id)

  if (updateError) {
    console.error('Error updating plan:', updateError)
    return NextResponse.json({ error: 'Failed to update plan in database' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

