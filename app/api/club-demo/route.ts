import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendNotification } from '@/lib/notify'
import { CLUB_EMAIL, FORM_GRADES, FORM_ROLES } from '@/lib/astronomy-club-data'

/**
 * ============================================================================
 *  ASTRONOMY CLUB — DEMO REQUEST ENDPOINT
 * ============================================================================
 *  Receives the /astronomy-club demo form and emails the lead to the club
 *  inbox (CLUB_LEADS_EMAIL, default contact@astriseducation.in) through the
 *  same providers as every other form on the site (lib/notify.ts):
 *
 *    WEB3FORMS_ACCESS_KEY  delivers to the inbox that owns the key — create
 *                          the key for contact@astriseducation.in, or
 *    RESEND_API_KEY + NOTIFY_FROM   sends to CLUB_LEADS_EMAIL directly, or
 *    FormSubmit (no key)   one-time activation link goes to CLUB_LEADS_EMAIL.
 *
 *  TODO(Rohit): set one of the above in Vercel for contact@astriseducation.in.
 *  No secret lives in this repo.
 *
 *  Spam: a honeypot field, a minimum fill time, and a best-effort per-IP
 *  rate limit (per warm instance, as in app/api/register).
 * ========================================================================== */

export const runtime = 'nodejs'

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.enum(FORM_ROLES),
  school: z.string().trim().min(2).max(160),
  city: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
  email: z.string().trim().email().max(160),
  grades: z.array(z.enum(FORM_GRADES)).max(3).default([]),
  /** A demo booking (the default) or a request for a quote. */
  kind: z.enum(['demo', 'quote']).default('demo'),
  week: z.string().trim().max(80).optional().or(z.literal('')),
  students: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
  // Honeypot. Accepted by the schema so a filled-in value gets the same
  // success response as a real lead, rather than a tell-tale 400.
  company: z.string().max(500).optional(),
  renderedAt: z.number().optional(),
})

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again shortly.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.' }, { status: 400 })
  }
  const d = parsed.data

  // Bots fill the honeypot or submit within a couple of seconds. Answer them
  // as if it worked, so they learn nothing.
  if (d.company || (d.renderedAt && Date.now() - d.renderedAt < 2500)) {
    return NextResponse.json({ ok: true })
  }

  const origin = req.headers.get('origin') || new URL(req.url).origin
  const to = [process.env.CLUB_LEADS_EMAIL || CLUB_EMAIL]
  const result = await sendNotification({
    subject: `Astronomy Club ${d.kind === 'quote' ? 'quote request' : 'demo request'} — ${d.school}, ${d.city}`,
    fromName: 'Astris Astronomy Club',
    replyTo: d.email,
    origin,
    to,
    rows: [
      ['Request', d.kind === 'quote' ? 'Quote' : 'Free assembly demo'],
      ['Name', d.name],
      ['Role', d.role],
      ['School', d.school],
      ['City', d.city],
      ['Phone / WhatsApp', d.phone],
      ['Email', d.email],
      ['Grades to start with', d.grades.length ? d.grades.join(', ') : '—'],
      ...(d.kind === 'quote'
        ? ([['Approximate number of students', d.students || '—']] as [string, string][])
        : ([['Preferred demo week', d.week || '—']] as [string, string][])),
      ['Message', d.message || '—'],
      ['Submitted', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
    ],
  })

  if (!result.sent) {
    // Keep the lead in the server logs so it is never silently lost.
    console.error('[club-demo] email not sent:', result.reason, JSON.stringify({ ...d, company: undefined }))
    return NextResponse.json(
      { ok: false, error: 'We couldn’t send that just now.' },
      { status: 502 },
    )
  }
  return NextResponse.json({ ok: true })
}
