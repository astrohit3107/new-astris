/**
 * ============================================================================
 *  REGISTRATIONS — NAKSHATRAALAY, WITHOUT A PAYMENT GATEWAY
 * ============================================================================
 *
 *  Every registration is written to the "Nakshatraalay Gurgaon — Registrations"
 *  Google Sheet and also emailed to the team, so a lead survives either one
 *  failing. The sheet is SEPARATE from the booking ledger on purpose: the
 *  ledger counts seats, and an unpaid registration must not hold one.
 *
 *  Two ways to reach the sheet — set either, both is fine:
 *
 *    REGISTRATIONS_WEBHOOK_URL   a Google Apps Script web app bound to the
 *    REGISTRATIONS_WEBHOOK_TOKEN sheet (scripts/registrations-apps-script.gs).
 *                                No Google Cloud project needed.
 *
 *    REGISTRATIONS_SHEET_ID      the sheet's id, written with the same service
 *                                account as the booking ledger
 *                                (GOOGLE_SERVICE_ACCOUNT_EMAIL / _PRIVATE_KEY).
 *                                Share the sheet with that email as Editor.
 * ============================================================================
 */

import { appendValues, hasServiceAccount } from '@/lib/sheets'

export const REGISTRATIONS_TAB = process.env.REGISTRATIONS_SHEET_TAB || 'Registrations'

/** Column order. Must match the header row of the sheet. */
export const REGISTRATION_COLUMNS = [
  'Registration ID',
  'Submitted At (IST)',
  'Payment Status',
  'Experience',
  'Experience Slug',
  'Package',
  'Date',
  'Guests',
  'Amount Due',
  'Name',
  'Email',
  'Phone',
  'UPI Txn / UTR',
  'Notes',
  'Source',
] as const

export interface RegistrationRow {
  registrationId: string
  submittedAt: string
  experience: string
  experienceSlug: string
  packageLabel: string
  date: string
  guests: number
  amountDue: string
  name: string
  email: string
  phone: string
  notes: string
  source: string
}

export function toValues(r: RegistrationRow): string[] {
  return [
    r.registrationId,
    r.submittedAt,
    'PAYMENT PENDING',
    r.experience,
    r.experienceSlug,
    r.packageLabel,
    r.date,
    String(r.guests),
    r.amountDue,
    r.name,
    r.email,
    // A leading apostrophe stops Sheets reading "+91 98..." as a formula.
    `'${r.phone}`,
    '',
    r.notes,
    r.source,
  ]
}

/** Short and readable aloud — guests put it in their UPI payment note. */
export function newRegistrationId(now: number = Date.now()): string {
  const rand = Math.random().toString(36).slice(2, 5)
  return `NK-${now.toString(36).slice(-5)}${rand}`.toUpperCase()
}

export function registrationSheetConfigured(): boolean {
  return Boolean(
    process.env.REGISTRATIONS_WEBHOOK_URL ||
      (process.env.REGISTRATIONS_SHEET_ID && hasServiceAccount())
  )
}

export async function appendRegistration(
  row: RegistrationRow
): Promise<{ ok: boolean; reason?: string }> {
  const values = toValues(row)
  let reason = 'registrations-sheet-not-configured'

  const hook = process.env.REGISTRATIONS_WEBHOOK_URL
  if (hook) {
    try {
      // Apps Script answers with a 302 to the script's output; fetch follows it.
      const res = await fetch(hook, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: process.env.REGISTRATIONS_WEBHOOK_TOKEN || '', values }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && json.ok) return { ok: true }
      reason = `apps-script:${res.status} ${json.error ?? ''}`.trim()
    } catch (e) {
      reason = `apps-script-exception:${String(e).slice(0, 160)}`
    }
  }

  const sheetId = process.env.REGISTRATIONS_SHEET_ID
  if (sheetId && hasServiceAccount()) {
    const result = await appendValues(sheetId, `${REGISTRATIONS_TAB}!A:O`, [values])
    if (result.ok) return result
    reason = result.reason ?? reason
  }

  return { ok: false, reason }
}
