/**
 * ============================================================================
 *  BOOKING POLICIES — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *
 *  These terms are shown on the policy pages, summarised on every experience
 *  page, and quoted verbatim in the confirmation email a guest receives. They
 *  live here so those three can never drift apart — a guest must never be able
 *  to find two different versions of the same rule.
 *
 *  ---------------------------------------------------------------------------
 *  ⚠  COMMERCIAL TERMS AWAITING SIGN-OFF
 *  ---------------------------------------------------------------------------
 *  The notice windows and refund percentages below are a fair, conventional
 *  starting point for a weather-dependent experience business. They were NOT
 *  supplied by the property. Read them once and correct anything that does not
 *  match how you actually intend to trade — they are contractual the moment a
 *  customer pays against them.
 *
 *  Cashfree also requires a publicly reachable cancellation and refund policy
 *  for merchant activation, which is what /nakshatraalay/gurgaon/cancellation
 *  exists to satisfy.
 * ============================================================================
 */

export interface RefundBand {
  /** Plain-language notice period. */
  window: string
  /** What the guest gets back. */
  refund: string
  /** Whether a free move to another date is available instead. */
  reschedule: string
}

export const REFUND_BANDS: RefundBand[] = [
  {
    window: '7 days or more before your date',
    refund: 'Full refund, less the payment-gateway fee',
    reschedule: 'Free — move to any available date within 90 days',
  },
  {
    window: 'Between 72 hours and 7 days before',
    refund: '50% refunded',
    reschedule: 'Free — move to any available date within 90 days',
  },
  {
    window: 'Less than 72 hours before',
    refund: 'No refund',
    reschedule: 'One move within 90 days, subject to availability',
  },
  {
    window: 'You do not arrive, and have not told us',
    refund: 'No refund',
    reschedule: 'Not available',
  },
]

export const POLICY = {
  /** How long a refund actually takes to land. */
  refundTiming:
    'Approved refunds are sent back to the card, account or UPI ID you paid from. Cashfree typically returns the money within 5–7 working days; we do not control that timing and cannot send it anywhere other than the original payment method.',

  gatewayFee:
    'The payment gateway charges a fee on every transaction and does not return it when a booking is cancelled. That fee is deducted from a full refund; it is not a charge we keep.',

  /** The single most misunderstood rule in this business. */
  weather:
    'A cloudy sky is not a cancellation. Observation always depends on conditions, so if the sky closes in we run the session indoors — telescope walkthroughs, astrophotography theory, image processing and sky planning — and use every clear window that opens. We never promise a specific object on a specific night, and cloud alone does not entitle you to a refund.',

  weatherOurCall:
    'If we call a night off ourselves — storms, a safety issue at the property, or anything else on our side — you choose: a full refund with no deduction, or a free move to another date.',

  reschedulingHow:
    'Ask as early as you can. Message us on WhatsApp or reply to your confirmation email with your payment ID and the date you would like instead. A move is confirmed only once we have replied and confirmed it — a request on its own does not change your booking.',

  rescheduleLimit:
    'One free move per booking. A second change is treated as a cancellation followed by a fresh booking.',

  capacity:
    'Groups are deliberately small so everyone gets real time at the eyepiece. Availability is confirmed when your payment is confirmed; this site does not display live seat counts.',

  lateArrival:
    'Sessions start at dusk and the sky does not wait. If you arrive late you are welcome to join what is left of the night, but we cannot extend it or refund the part you missed.',

  minors:
    'Under-18s are welcome on the stargazing experience and family nights, accompanied by an adult who stays for the session.',

  cancelHow:
    'To cancel, message us on WhatsApp or reply to your confirmation email quoting your payment ID. We will confirm in writing and start the refund on the same day where one is due.',
} as const

/** Last substantive change to these terms. Update when the wording changes. */
export const POLICY_UPDATED = '2026-09-07'
