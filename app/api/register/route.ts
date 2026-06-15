import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * ============================================================================
 *  REGISTRATION / BOOKING ENQUIRY ENDPOINT
 * ============================================================================
 *  Receives the Astroventure Nights registration form, validates it, screens
 *  for spam, and emails the enquiry to your team.
 *
 *  EMAIL SETUP (placeholders for you to fill in)
 *  ---------------------------------------------
 *  Set these environment variables (see .env.example):
 *    RESEND_API_KEY   – API key from https://resend.com (free tier available)
 *    NOTIFY_EMAIL_1   – defaults to astriseducation@gmail.com (override via env)
 *    NOTIFY_EMAIL_2   – second recipient (set this once you have it)
 *    NOTIFY_FROM      – verified "From" address, e.g. bookings@yourdomain.com
 *
 *  If RESEND_API_KEY / recipients are not configured, the submission is still
 *  accepted and logged to the server console so the form works in development.
 *  Swap Resend for any provider (SendGrid, SES, Postmark, SMTP) by editing
 *  `sendEmail()` below.
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

async function sendEmail(data: z.infer<typeof schema>): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const recipients = [
    process.env.NOTIFY_EMAIL_1 || 'astriseducation@gmail.com', // primary recipient
    process.env.NOTIFY_EMAIL_2, // second recipient — set NOTIFY_EMAIL_2 when ready
  ].filter((e): e is string => !!e && /.+@.+\..+/.test(e))
  const from = process.env.NOTIFY_FROM || 'Astroventure Nights <onboarding@resend.dev>'

  if (!apiKey || recipients.length === 0) {
    return { sent: false, reason: 'email-not-configured' }
  }

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

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: data.email,
      subject: `New Astroventure Nights enquiry — ${data.fullName}`,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return { sent: false, reason: `email-provider-error: ${res.status} ${detail.slice(0, 200)}` }
  }
  return { sent: true }
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
  try {
    const result = await sendEmail(data)
    if (!result.sent && result.reason !== 'email-not-configured') {
      console.error('[register] email failed:', result.reason)
      return NextResponse.json(
        { ok: false, error: 'We could not send your request right now. Please try again or contact us directly.' },
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
