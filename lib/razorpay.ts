import crypto from 'node:crypto'

/**
 * Razorpay, without the SDK.
 *
 * The Orders API is a single authenticated POST and the signature checks are
 * plain HMAC-SHA256, so a dependency buys us nothing here and costs us a
 * supply-chain surface on a payments path.
 *
 * SECRETS NEVER REACH THE BROWSER. `RAZORPAY_KEY_ID` is publishable and is
 * handed to Checkout; `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are
 * read only inside these server-only functions.
 */

const API = 'https://api.razorpay.com/v1'

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}

/** Publishable key, safe to send to the client. */
export function razorpayKeyId(): string {
  return process.env.RAZORPAY_KEY_ID ?? ''
}

function secret(): string {
  if (typeof window !== 'undefined') {
    throw new Error('RAZORPAY_KEY_SECRET was read in the browser.')
  }
  return process.env.RAZORPAY_KEY_SECRET ?? ''
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  status: string
}

/**
 * Create an order. `amountPaise` must already have been computed from our own
 * catalogue — this function does not price anything.
 */
export async function createOrder(input: {
  amountPaise: number
  receipt: string
  notes: Record<string, string>
}): Promise<RazorpayOrder> {
  const auth = Buffer.from(`${razorpayKeyId()}:${secret()}`).toString('base64')
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: 'INR',
      // Razorpay caps receipts at 40 characters.
      receipt: input.receipt.slice(0, 40),
      notes: input.notes,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`razorpay-order-failed: ${res.status} ${body.slice(0, 300)}`)
  }
  return (await res.json()) as RazorpayOrder
}

/** Constant-time compare that tolerates unequal lengths. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

/**
 * Verify a Checkout success payload.
 *
 * Razorpay signs `order_id|payment_id` with the key secret. A client can send
 * us anything, so this is what decides whether a payment actually happened.
 */
export function verifyPaymentSignature(input: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const expected = crypto
    .createHmac('sha256', secret())
    .update(`${input.orderId}|${input.paymentId}`)
    .digest('hex')
  return safeEqual(expected, input.signature)
}

/** Verify a webhook. The RAW body must be passed, not a re-serialised object. */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const wh = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!wh) return false
  const expected = crypto.createHmac('sha256', wh).update(rawBody).digest('hex')
  return safeEqual(expected, signature)
}

/** Server-side truth for a payment, independent of anything the client said. */
export async function fetchPayment(paymentId: string): Promise<{
  id: string
  status: string
  amount: number
  order_id: string
  method?: string
} | null> {
  const auth = Buffer.from(`${razorpayKeyId()}:${secret()}`).toString('base64')
  const res = await fetch(`${API}/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Basic ${auth}` },
  })
  if (!res.ok) return null
  return (await res.json()) as { id: string; status: string; amount: number; order_id: string; method?: string }
}
