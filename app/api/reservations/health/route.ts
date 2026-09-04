import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Configuration check for the reservation system.
 *
 * Reports only whether each secret is PRESENT — never its value, never even
 * its length. Knowing that a secret exists is not exploitable: every path
 * fails closed when one is missing.
 *
 * Exists because a missing key is otherwise invisible until a customer is
 * standing at the payment screen.
 */
export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID ?? ''
  const payments = Boolean(keyId && process.env.RAZORPAY_KEY_SECRET)
  const webhook = Boolean(process.env.RAZORPAY_WEBHOOK_SECRET)
  const email = Boolean(process.env.WEB3FORMS_ACCESS_KEY || process.env.RESEND_API_KEY)

  return NextResponse.json({
    ok: payments && webhook && email,
    payments,
    // Which Razorpay environment the site is charging in. Derived from the
    // publishable key id, which is public anyway.
    mode: !keyId ? 'unconfigured' : keyId.startsWith('rzp_live_') ? 'live' : 'test',
    webhook,
    email,
    // Plain-English next step, so a red line here is actionable.
    missing: [
      !payments && 'RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET',
      !webhook && 'RAZORPAY_WEBHOOK_SECRET',
      !email && 'WEB3FORMS_ACCESS_KEY or RESEND_API_KEY (bookings would not reach your inbox)',
    ].filter(Boolean),
  })
}
