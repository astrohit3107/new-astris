/**
 * ============================================================================
 *  CASHFREE PAYMENTS
 * ============================================================================
 *
 *  Two things about Cashfree differ from Razorpay in ways that will bite if
 *  they are missed, so they are stated here rather than buried:
 *
 *  1. AMOUNTS ARE IN RUPEES, not paise. `order_amount: 1500` is fifteen
 *     hundred rupees. Passing our paise figure would charge a hundred times
 *     the price. Everything below converts explicitly and never guesses.
 *
 *  2. CHECKOUT RETURNS NO SIGNATURE. Razorpay handed the browser a signed
 *     `order_id|payment_id` we could verify. Cashfree's SDK simply resolves,
 *     and its own bundle says "Payment finished. Check status." So the browser
 *     is not evidence of anything: a payment is confirmed only by asking
 *     Cashfree's API directly, server to server.
 *
 *     That leaves one gap a signature used to close. Anybody could post a
 *     stranger's paid order id along with their own booking. So at order
 *     creation we stamp an HMAC of the booking into the order's tags, and at
 *     confirmation we recompute it from what was submitted and require the
 *     two to match — binding a payment to exactly one booking.
 *
 *  ENVIRONMENT
 *    CASHFREE_APP_ID          "x-client-id"
 *    CASHFREE_SECRET_KEY      "x-client-secret" — server only, never shipped
 *    CASHFREE_ENV             "sandbox" | "production" — required, no default
 *    CASHFREE_WEBHOOK_SECRET  optional; defaults to CASHFREE_SECRET_KEY
 * ============================================================================
 */

import crypto from 'node:crypto'

const API_VERSION = '2026-01-01'

export type CashfreeEnv = 'sandbox' | 'production'

export function cashfreeEnv(): CashfreeEnv | null {
  const v = (process.env.CASHFREE_ENV || '').trim().toLowerCase()
  return v === 'sandbox' || v === 'production' ? v : null
}

function baseUrl(): string {
  return cashfreeEnv() === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg'
}

/**
 * Deliberately requires CASHFREE_ENV to be set explicitly.
 *
 * Defaulting either way is a trap: defaulting to sandbox in production takes
 * no money while telling guests they are booked, and defaulting to production
 * in a test charges someone real money. Unset means not configured.
 */
export function isCashfreeConfigured(): boolean {
  return Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY && cashfreeEnv())
}

function secret(): string {
  const s = process.env.CASHFREE_SECRET_KEY
  if (!s) throw new Error('CASHFREE_SECRET_KEY is not set')
  return s
}

function headers(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'x-api-version': API_VERSION,
    'x-client-id': process.env.CASHFREE_APP_ID!,
    'x-client-secret': secret(),
  }
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

/* -------------------------------------------------------------------------- *
 *  Binding a payment to its booking
 * -------------------------------------------------------------------------- */

export interface BookingIdentity {
  experienceSlug: string
  tierLabel: string
  date: string
  guests: number
  email: string
  amountPaise: number
}

/**
 * A fingerprint of the booking, keyed on our secret.
 *
 * Stamped into the Cashfree order at creation and re-derived at confirmation.
 * Anything the guest could edit — the date, the package, the head count — is
 * inside it, so a tampered confirmation cannot match a real payment.
 */
export function bookingHash(b: BookingIdentity): string {
  const canonical = [
    b.experienceSlug,
    b.tierLabel,
    b.date,
    String(b.guests),
    b.email.trim().toLowerCase(),
    String(b.amountPaise),
  ].join('|')
  return crypto.createHmac('sha256', secret()).update(canonical).digest('hex').slice(0, 40)
}

/* -------------------------------------------------------------------------- *
 *  Orders
 * -------------------------------------------------------------------------- */

export interface CreatedOrder {
  orderId: string
  paymentSessionId: string
  orderAmount: number
}

export async function createOrder(input: {
  /** Whole rupees. Converted to Cashfree's decimal-rupee format here. */
  amountPaise: number
  orderId: string
  customer: { id: string; name: string; email: string; phone: string }
  returnUrl?: string
  notifyUrl?: string
  tags: Record<string, string>
}): Promise<CreatedOrder> {
  // Paise → rupees, to two decimals, exactly once and only here.
  const orderAmount = Number((input.amountPaise / 100).toFixed(2))

  const res = await fetch(`${baseUrl()}/orders`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      order_id: input.orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: input.customer.id,
        customer_name: input.customer.name.slice(0, 100),
        customer_email: input.customer.email,
        // Cashfree wants ten digits; strip the +91 and any punctuation.
        customer_phone: input.customer.phone.replace(/\D/g, '').slice(-10),
      },
      order_meta: {
        ...(input.returnUrl ? { return_url: input.returnUrl } : {}),
        ...(input.notifyUrl ? { notify_url: input.notifyUrl } : {}),
      },
      // Max 15 pairs, values must be strings.
      order_tags: Object.fromEntries(
        Object.entries(input.tags).slice(0, 15).map(([k, v]) => [k, String(v).slice(0, 255)])
      ),
    }),
  })

  if (!res.ok) {
    throw new Error(`cashfree-create-order:${res.status} ${(await res.text()).slice(0, 300)}`)
  }

  const json = (await res.json()) as {
    order_id?: string
    payment_session_id?: string
    order_amount?: number
  }
  if (!json.order_id || !json.payment_session_id) {
    throw new Error('cashfree-create-order: missing order_id or payment_session_id')
  }
  return {
    orderId: json.order_id,
    paymentSessionId: json.payment_session_id,
    orderAmount: json.order_amount ?? orderAmount,
  }
}

export interface FetchedOrder {
  orderId: string
  status: string
  amountRupees: number
  tags: Record<string, string>
}

/** The authoritative answer to "was this actually paid?". */
export async function fetchOrder(orderId: string): Promise<FetchedOrder | null> {
  try {
    const res = await fetch(`${baseUrl()}/orders/${encodeURIComponent(orderId)}`, {
      headers: headers(),
    })
    if (!res.ok) {
      console.error('[cashfree] fetch order failed', res.status, (await res.text()).slice(0, 200))
      return null
    }
    const j = (await res.json()) as {
      order_id?: string
      order_status?: string
      order_amount?: number
      order_tags?: Record<string, string> | null
    }
    if (!j.order_id) return null
    return {
      orderId: j.order_id,
      status: (j.order_status || '').toUpperCase(),
      amountRupees: Number(j.order_amount ?? 0),
      tags: j.order_tags ?? {},
    }
  } catch (e) {
    console.error('[cashfree] fetch order exception', String(e).slice(0, 160))
    return null
  }
}

export interface OrderPayment {
  paymentId: string
  status: string
  amountRupees: number
  method: string
}

/** The individual transactions behind an order — for the booking record. */
export async function fetchOrderPayments(orderId: string): Promise<OrderPayment[]> {
  try {
    const res = await fetch(`${baseUrl()}/orders/${encodeURIComponent(orderId)}/payments`, {
      headers: headers(),
    })
    if (!res.ok) return []
    const list = (await res.json()) as Array<{
      cf_payment_id?: string | number
      payment_status?: string
      payment_amount?: number
      payment_group?: string
      payment_method?: unknown
    }>
    if (!Array.isArray(list)) return []
    return list.map((p) => ({
      paymentId: String(p.cf_payment_id ?? ''),
      status: (p.payment_status || '').toUpperCase(),
      amountRupees: Number(p.payment_amount ?? 0),
      method: p.payment_group || 'unknown',
    }))
  } catch {
    return []
  }
}

/* -------------------------------------------------------------------------- *
 *  Webhooks
 * -------------------------------------------------------------------------- */

/**
 * Cashfree signs `timestamp + rawBody`, HMAC-SHA256, base64.
 *
 * Note both differences from Razorpay: the timestamp is part of the signed
 * string, and the digest is base64 rather than hex. The body must be the raw
 * text — re-serialising parsed JSON will not reproduce it byte for byte.
 */
export function verifyWebhookSignature(input: {
  rawBody: string
  timestamp: string
  signature: string
}): boolean {
  const key = process.env.CASHFREE_WEBHOOK_SECRET || process.env.CASHFREE_SECRET_KEY
  if (!key || !input.timestamp || !input.signature) return false
  const expected = crypto
    .createHmac('sha256', key)
    .update(input.timestamp + input.rawBody)
    .digest('base64')
  return safeEqual(expected, input.signature)
}
