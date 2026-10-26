/**
 * ============================================================================
 *  HOW GUESTS PAY WHILE THERE IS NO PAYMENT GATEWAY
 * ============================================================================
 *
 *  Shown on the registration form for Nakshatraalay Gurgaon. A guest registers,
 *  the registration lands in the Google Sheet as PAYMENT PENDING, and the
 *  guest pays by UPI or bank transfer using the details below. Mark the row
 *  PAID in the sheet once the money shows up in the account.
 *
 *  TODO(Rohit): replace every "XXXX" below with the real details, and drop the
 *  bank's UPI QR image at public/nakshatraalay/upi-qr.png. Until the UPI ID is
 *  filled in, the form hides the UPI and bank blocks rather than showing
 *  placeholders to a customer.
 * ============================================================================
 */

export const PAYMENT_DETAILS = {
  upi: {
    /** e.g. astrisspace@okhdfcbank */
    id: 'XXXX@XXXX',
    /** Name the guest's UPI app shows before they confirm. */
    payeeName: 'ASTRIS SPACEED LLP',
    /** Static QR from your bank or UPI app. Set to '' if you have none. */
    qrImage: '/nakshatraalay/upi-qr.png',
  },
  bank: {
    accountName: 'ASTRIS SPACEED LLP',
    accountNumber: 'XXXX',
    ifsc: 'XXXX',
    bankName: 'XXXX',
    branch: 'XXXX',
  },
} as const

const isPlaceholder = (v: string) => !v || v.includes('XXXX')

export const upiReady = !isPlaceholder(PAYMENT_DETAILS.upi.id)
export const bankReady =
  !isPlaceholder(PAYMENT_DETAILS.bank.accountNumber) && !isPlaceholder(PAYMENT_DETAILS.bank.ifsc)

/**
 * A upi:// link with the amount and reference filled in. On a phone it opens
 * GPay / PhonePe / Paytm with everything ready; on desktop it does nothing,
 * which is why the QR and the UPI ID are shown alongside it.
 */
export function upiHref(amount: number, reference: string): string {
  const params = new URLSearchParams({
    pa: PAYMENT_DETAILS.upi.id,
    pn: PAYMENT_DETAILS.upi.payeeName,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: reference,
  })
  return `upi://pay?${params.toString()}`
}
