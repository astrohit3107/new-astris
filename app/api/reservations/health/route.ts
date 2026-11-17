import { NextResponse } from 'next/server'

import { isCashfreeConfigured, cashfreeEnv } from '@/lib/cashfree'
import { isSheetsConfigured, readBookings } from '@/lib/sheets'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Is this thing actually wired up?
 *
 * Reports only whether each secret is PRESENT and whether the sheet can be
 * read — never the values. Safe to open in a browser while configuring.
 */
export async function GET() {
  const payments = isCashfreeConfigured()
  // Cashfree sandbox App IDs start with "TEST". Using one with
  // CASHFREE_ENV=production is the commonest reason orders are refused.
  const appId = process.env.CASHFREE_APP_ID ?? ''
  const keyKind = !appId ? 'missing' : /^TEST/i.test(appId) ? 'sandbox' : 'production'
  const mode = cashfreeEnv()

  const sheetsConfigured = isSheetsConfigured()
  // A configured sheet that cannot actually be read is the failure worth
  // catching here, so this does a real read rather than an env-var check.
  const rows = sheetsConfigured ? await readBookings() : null
  const sheetReadable = rows !== null

  const guestEmail = Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_FROM)
  const teamEmail = Boolean(
    process.env.WEB3FORMS_ACCESS_KEY || process.env.RESEND_API_KEY || process.env.NOTIFY_EMAIL_1
  )

  const missing = [
    !process.env.CASHFREE_APP_ID && 'CASHFREE_APP_ID',
    !process.env.CASHFREE_SECRET_KEY && 'CASHFREE_SECRET_KEY',
    !mode && 'CASHFREE_ENV (must be exactly "sandbox" or "production")',
    !process.env.GOOGLE_SHEET_ID && 'GOOGLE_SHEET_ID',
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && 'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    !process.env.GOOGLE_PRIVATE_KEY && 'GOOGLE_PRIVATE_KEY',
    !process.env.RESEND_API_KEY && 'RESEND_API_KEY (guest confirmation emails)',
    !process.env.NOTIFY_FROM && 'NOTIFY_FROM (guest confirmation emails)',
  ].filter(Boolean)

  return NextResponse.json({
    ok: payments && sheetReadable && guestEmail,
    payments,
    mode: mode ?? 'NOT SET',
    keyKind,
    keyModeMismatch: Boolean(mode && keyKind !== 'missing' && keyKind !== mode),
    sheet: {
      configured: sheetsConfigured,
      readable: sheetReadable,
      rows: rows?.length ?? null,
      hint:
        sheetsConfigured && !sheetReadable
          ? 'Configured but unreadable — is the sheet shared with the service-account email as an Editor?'
          : undefined,
    },
    email: { guestConfirmations: guestEmail, teamNotifications: teamEmail },
    missing,
  })
}
