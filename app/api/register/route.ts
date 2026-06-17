import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * ============================================================================
 *  REGISTRATION / BOOKING ENQUIRY ENDPOINT
 * ============================================================================
 *  Receives the Astroventure Nights registration form, validates it, screens
 *  for spam, and emails the enquiry to your team.
 *
 *  EMAIL SETUP
 *  -----------
 *  Enquiries are delivered to astriseducation@gmail.com and
 *  eeshumtravels@gmail.com (override via NOTIFY_EMAIL_1 / NOTIFY_EMAIL_2).
 *
 *  Works out of the box via FormSubmit (https://formsubmit.co) — no account,
 *  API key or env var required. IMPORTANT one-time step: the FIRST time the
 *  form is submitted, FormSubmit emails an activation link to the primary
 *  address (astriseducation@gmail.com). Click it once; after that every
 *  enquiry is delivered automatically (with the second address CC'd).
 *
 *  Optional upgrades (set either to override FormSubmit):
 *    WEB3FORMS_ACCESS_KEY  – https://web3forms.com (no domain to verify)
 *    RESEND_API_KEY (+ NOTIFY_FROM) – https://resend.com (needs a domain)
 * ============================================================================
 */

export const runtime = 'nodejs'

const schema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
  email: z.string().trim().email().max(160),
  age: z.coerce.number().int().min(5).max(120),
  city: z.string().trim().min(2).max(80),
  participants: z.coerce.number().int().min(1).max(20),
  destination: z.string().trim().min(1).max(60),
  preferredDate: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
  consent: z.literal(true),
  company: z.string().max(0).optional().or(z.literal('')), // honeypot — must be empty
  renderedAt: z.number().optional(),
})

// --- Best-effort in-memory rate limiting (per warm instance) ---------------
const RATE_LIMIT = 5 // submissions
const RATE_WINDOW_MS = 10 * 60 * 1000 // per 10 minutes
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

/** Booking enquiries are emailed to both of these inboxes. */
const RECIPIENTS = [
  process.env.NOTIFY_EMAIL_1 || 'astriseducation@gmail.com',
  process.env.NOTIFY_EMAIL_2 || 'eeshumtravels@gmail.com',
].filter((e): e is string => !!e && /.+@.+\..+/.test(e))

async function sendEmail(
  data: z.infer<typeof schema>,
  origin: string,
): Promise<{ sent: boolean; reason?: string }> {
  let lastError = 'email-not-configured'
  const rows: [string, string][] = [
    ['Full Name', data.fullName],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Age', String(data.age)],
    ['City', data.city],
    ['Participants', String(data.participants)],
    ['Preferred Destination', data.destination],
    ['Preferred Date', data.preferredDate],
    ['Notes', data.notes || '—'],
  ]

  const subject = `New Astroventure Nights enquiry — ${data.fullName}`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0b0b14">
      <h2 style="margin:0 0 4px">🌌 New Astroventure Nights enquiry</h2>
      <p style="color:#666;margin:0 0 16px">A new registration was submitted.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 10px;background:#f4f4f7;font-weight:600;border:1px solid #e5e5ea;width:40%">${escapeHtml(
                k,
              )}</td><td style="padding:8px 10px;border:1px solid #e5e5ea">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
    </div>`

  // --- Option A: Web3Forms ---------------------------------------------------
  // Easiest setup: create a free access key at https://web3forms.com (just
  // enter astriseducation@gmail.com — no domain to verify) and set
  // WEB3FORMS_ACCESS_KEY in your environment. Add eeshumtravels@gmail.com as a
  // second recipient from the Web3Forms dashboard.
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY
  if (web3Key) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject,
          from_name: 'Astroventure Nights',
          replyto: data.email,
          // include the second inbox if the plan allows multiple recipients
          cc: RECIPIENTS.join(','),
          message: text,
          ...Object.fromEntries(rows),
        }),
      })
      if (res.ok) return { sent: true }
      lastError = `web3forms-error: ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`
    } catch (e) {
      lastError = `web3forms-exception: ${String(e).slice(0, 200)}`
    }
  }

  // --- Option B: Resend ------------------------------------------------------
  // Requires RESEND_API_KEY and a verified sender domain (NOTIFY_FROM). The
  // shared onboarding@resend.dev sender only delivers to your own Resend
  // account email until you verify a domain.
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey && RECIPIENTS.length > 0) {
    try {
      const from = process.env.NOTIFY_FROM || 'Astroventure Nights <onboarding@resend.dev>'
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: RECIPIENTS,
          reply_to: data.email,
          subject,
          html,
          text,
        }),
      })
      if (res.ok) return { sent: true }
      // fall through to FormSubmit if Resend rejects (e.g. unverified domain)
      lastError = `resend-error: ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`
    } catch (e) {
      lastError = `resend-exception: ${String(e).slice(0, 200)}`
    }
  }

  // --- Default: FormSubmit (zero-config — no account, key or env needed) -----
  // Delivers to the RECIPIENTS below. The first submission triggers a one-time
  // activation email to the primary address; click its link once and every
  // future enquiry is delivered automatically. FormSubmit requires an Origin
  // header and returns HTTP 200 even on soft failures, so parse the body.
  if (RECIPIENTS.length > 0) {
    try {
      const [primary, ...cc] = RECIPIENTS
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primary)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: origin,
          Referer: origin,
        },
        body: JSON.stringify({
          _subject: subject,
          _replyto: data.email,
          _template: 'table',
          ...(cc.length ? { _cc: cc.join(',') } : {}),
          ...Object.fromEntries(rows),
        }),
      })
      const json: { success?: string | boolean; message?: string } = await res
        .json()
        .catch(() => ({}))
      const success = json.success === true || json.success === 'true'
      // "needs activation" is a one-time bootstrap, not a real failure
      const pendingActivation = /activat/i.test(json.message || '')
      if (res.ok && (success || pendingActivation)) return { sent: true }
      lastError = `formsubmit-error: ${res.status} ${JSON.stringify(json).slice(0, 200)}`
    } catch (e) {
      lastError = `formsubmit-exception: ${String(e).slice(0, 200)}`
    }
  }

  return { sent: false, reason: lastError }
}

/** Lightweight health/version check (no email sent). */
export async function GET() {
  return NextResponse.json({ ok: true, service: 'register', delivery: 'formsubmit-fallback' })
}

export async function POST(req: Request) {
  // Identify client for rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please try again in a little while.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check the form and try again.' },
      { status: 422 },
    )
  }
  const data = parsed.data

  // --- Spam protection -------------------------------------------------------
  // 1. Honeypot: real users never fill the hidden "company" field.
  if (data.company && data.company.length > 0) {
    // Silently accept to avoid signalling the bot, but do not email.
    return NextResponse.json({ ok: true })
  }
  // 2. Timing: forms filled in under ~2.5s are almost certainly bots.
  if (data.renderedAt && Date.now() - data.renderedAt < 2500) {
    return NextResponse.json(
      { ok: false, error: 'Form submitted too quickly. Please try again.' },
      { status: 429 },
    )
  }

  // --- Deliver ---------------------------------------------------------------
  // FormSubmit requires a real Origin/Referer; derive it from the request.
  const host = req.headers.get('host')
  const origin =
    req.headers.get('origin') ||
    (host ? `https://${host}` : '') ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.astriseducation.in'

  const debug = new URL(req.url).searchParams.get('debug') === '1'
  try {
    const result = await sendEmail(data, origin)
    if (!result.sent && result.reason !== 'email-not-configured') {
      console.error('[register] email failed:', result.reason)
      return NextResponse.json(
        {
          ok: false,
          error: 'We could not send your request right now. Please try again or contact us directly.',
          ...(debug ? { reason: result.reason, origin } : {}),
        },
        { status: 502 },
      )
    }
    if (result.reason === 'email-not-configured') {
      // Development / not-yet-configured: log so nothing is lost.
      console.log('[register] (email not configured) new enquiry:', {
        ...data,
        company: undefined,
        renderedAt: undefined,
      })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[register] unexpected error:', err)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
