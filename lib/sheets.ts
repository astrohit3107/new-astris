/**
 * ============================================================================
 *  GOOGLE SHEETS — THE BOOKING LEDGER
 * ============================================================================
 *
 *  This site still has no database. The sheet IS the booking ledger: every
 *  confirmed booking is appended to it, and anything typed into it by hand
 *  counts exactly the same. That is the point — availability has to reflect
 *  the phone bookings and walk-ins that never touch this website.
 *
 *  Talking to Google needs a service account. Rather than pull in `googleapis`
 *  (large, and mostly code we would never call) this signs its own JWT with
 *  node:crypto and uses the REST API directly.
 *
 *  ENVIRONMENT
 *    GOOGLE_SHEET_ID              the id from the sheet's URL
 *    GOOGLE_SERVICE_ACCOUNT_EMAIL  ...@...iam.gserviceaccount.com
 *    GOOGLE_PRIVATE_KEY            the PEM, newlines may be written as \n
 *
 *  The sheet must be SHARED with that service-account email as an Editor,
 *  which is the step everyone forgets.
 * ============================================================================
 */

import crypto from 'node:crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

/** Tab name inside the spreadsheet. */
export const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || 'Bookings'

/** Column order. Changing this means changing the sheet's header row too. */
export const SHEET_COLUMNS = [
  'Booking ID',
  'Booked At (IST)',
  'Status',
  'Experience',
  'Experience Slug',
  'Package',
  'Date',
  'Guests',
  'Name',
  'Email',
  'Phone',
  'Amount',
  'Payment ID',
  'Gear',
  'Notes',
  'Source',
] as const

export interface BookingRow {
  bookingId: string
  bookedAt: string
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING'
  experience: string
  experienceSlug: string
  packageLabel: string
  date: string
  guests: number
  name: string
  email: string
  phone: string
  amount: string
  paymentId: string
  gear: string
  notes: string
  source: string
}

export function isSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
  )
}

/** The PEM survives a round trip through env vars with literal \n. */
function privateKey(): string {
  return (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim()
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/* -------------------------------------------------------------------------- *
 *  Access token, cached until shortly before it expires.
 *  Minting one costs a round trip and an RSA signature; doing that on every
 *  page view that shows availability would be silly.
 * -------------------------------------------------------------------------- */
let cachedToken: { token: string; expiresAt: number } | null = null

async function accessToken(): Promise<string | null> {
  if (!isSheetsConfigured()) return null
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.token

  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(
    JSON.stringify({
      iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  )

  let signature: string
  try {
    signature = b64url(crypto.createSign('RSA-SHA256').update(`${header}.${claim}`).sign(privateKey()))
  } catch (e) {
    console.error('[sheets] could not sign JWT — check GOOGLE_PRIVATE_KEY', String(e).slice(0, 160))
    return null
  }

  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: `${header}.${claim}.${signature}`,
      }),
    })
    if (!res.ok) {
      console.error('[sheets] token request failed', res.status, (await res.text()).slice(0, 200))
      return null
    }
    const json = (await res.json()) as { access_token?: string; expires_in?: number }
    if (!json.access_token) return null
    cachedToken = {
      token: json.access_token,
      expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 - 60_000,
    }
    return cachedToken.token
  } catch (e) {
    console.error('[sheets] token exception', String(e).slice(0, 160))
    return null
  }
}

/* -------------------------------------------------------------------------- *
 *  Writing
 * -------------------------------------------------------------------------- */

/** Append one booking. Returns false rather than throwing — the caller has
 *  already taken money and must not fail because a spreadsheet was busy. */
export async function appendBooking(row: BookingRow): Promise<{ ok: boolean; reason?: string }> {
  const token = await accessToken()
  if (!token) return { ok: false, reason: 'sheets-not-configured' }

  const values = [
    [
      row.bookingId,
      row.bookedAt,
      row.status,
      row.experience,
      row.experienceSlug,
      row.packageLabel,
      row.date,
      String(row.guests),
      row.name,
      row.email,
      row.phone,
      row.amount,
      row.paymentId,
      row.gear,
      row.notes,
      row.source,
    ],
  ]

  try {
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(process.env.GOOGLE_SHEET_ID!)}` +
      `/values/${encodeURIComponent(`${SHEET_TAB}!A:P`)}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    })
    if (res.ok) {
      invalidateBookingCache()
      return { ok: true }
    }
    return { ok: false, reason: `sheets:${res.status} ${(await res.text()).slice(0, 200)}` }
  } catch (e) {
    return { ok: false, reason: `sheets-exception:${String(e).slice(0, 160)}` }
  }
}

/* -------------------------------------------------------------------------- *
 *  Reading
 *  Cached briefly. Availability is read on page views and Sheets has a per
 *  minute read quota, so an uncached read per visitor would break under any
 *  real traffic.
 * -------------------------------------------------------------------------- */
const READ_TTL_MS = 30_000
let cachedRows: { rows: BookingRow[]; at: number } | null = null

export function invalidateBookingCache(): void {
  cachedRows = null
}

function toRow(r: string[]): BookingRow {
  const at = (i: number) => (r[i] ?? '').trim()
  return {
    bookingId: at(0),
    bookedAt: at(1),
    status: (at(2).toUpperCase() as BookingRow['status']) || 'CONFIRMED',
    experience: at(3),
    experienceSlug: at(4),
    packageLabel: at(5),
    date: at(6),
    guests: Number.parseInt(at(7), 10) || 0,
    name: at(8),
    email: at(9),
    phone: at(10),
    amount: at(11),
    paymentId: at(12),
    gear: at(13),
    notes: at(14),
    source: at(15),
  }
}

/**
 * Every booking in the ledger.
 *
 * Returns null — not an empty list — when the sheet cannot be read. The
 * difference matters: "no bookings" means everything is available, "cannot
 * tell" must never be rendered as everything is available.
 */
export async function readBookings(): Promise<BookingRow[] | null> {
  if (cachedRows && Date.now() - cachedRows.at < READ_TTL_MS) return cachedRows.rows

  const token = await accessToken()
  if (!token) return null

  try {
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(process.env.GOOGLE_SHEET_ID!)}` +
      `/values/${encodeURIComponent(`${SHEET_TAB}!A2:P`)}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) {
      console.error('[sheets] read failed', res.status, (await res.text()).slice(0, 200))
      return null
    }
    const json = (await res.json()) as { values?: string[][] }
    const rows = (json.values ?? []).map(toRow).filter((r) => r.date && r.experienceSlug)
    cachedRows = { rows, at: Date.now() }
    return rows
  } catch (e) {
    console.error('[sheets] read exception', String(e).slice(0, 160))
    return null
  }
}
