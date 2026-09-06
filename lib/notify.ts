/**
 * Sending a booking somewhere a human will see it.
 *
 * This site has no database, so an email IS the booking record. That makes
 * delivery failure a real failure, not a cosmetic one — callers are expected
 * to surface it rather than swallow it. Razorpay's own dashboard remains the
 * source of truth for money.
 */

export const NOTIFY_RECIPIENTS = [
  process.env.NOTIFY_EMAIL_1 || 'astriseducation@gmail.com',
  process.env.NOTIFY_EMAIL_2 || '',
].filter((e): e is string => !!e && /.+@.+\..+/.test(e))

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  )
}

export async function sendNotification(input: {
  subject: string
  rows: [string, string][]
  replyTo?: string
  origin?: string
}): Promise<{ sent: boolean; reason?: string }> {
  const text = input.rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#0b0b14">
      <h2 style="margin:0 0 14px">${escapeHtml(input.subject)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${input.rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 10px;background:#f4f4f7;font-weight:600;border:1px solid #e5e5ea;width:38%">${escapeHtml(k)}</td><td style="padding:8px 10px;border:1px solid #e5e5ea">${escapeHtml(v)}</td></tr>`
          )
          .join('')}
      </table>
    </div>`

  let lastError = 'email-not-configured'

  // Web3Forms — server-friendly, no domain to verify.
  const web3 = process.env.WEB3FORMS_ACCESS_KEY
  if (web3) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3,
          subject: input.subject,
          from_name: 'Nakshatraalay reservations',
          replyto: input.replyTo,
          message: text,
          ...Object.fromEntries(input.rows),
        }),
      })
      if (res.ok) return { sent: true }
      lastError = `web3forms:${res.status}`
    } catch (e) {
      lastError = `web3forms-exception:${String(e).slice(0, 120)}`
    }
  }

  // Resend — needs a verified sending domain.
  const resend = process.env.RESEND_API_KEY
  if (resend && NOTIFY_RECIPIENTS.length) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resend}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM || 'Nakshatraalay <onboarding@resend.dev>',
          to: NOTIFY_RECIPIENTS,
          reply_to: input.replyTo,
          subject: input.subject,
          html,
          text,
        }),
      })
      if (res.ok) return { sent: true }
      lastError = `resend:${res.status}`
    } catch (e) {
      lastError = `resend-exception:${String(e).slice(0, 120)}`
    }
  }

  // FormSubmit — zero config, but blocks datacenter IPs, so it is the last
  // resort here rather than the default it is on the browser-side forms.
  if (NOTIFY_RECIPIENTS.length && input.origin) {
    try {
      const [primary, ...cc] = NOTIFY_RECIPIENTS
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primary)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: input.origin,
          Referer: input.origin,
        },
        body: JSON.stringify({
          _subject: input.subject,
          _template: 'table',
          ...(cc.length ? { _cc: cc.join(',') } : {}),
          ...Object.fromEntries(input.rows),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { success?: unknown; message?: string }
      if (res.ok && (json.success === true || json.success === 'true' || /activat/i.test(json.message ?? ''))) {
        return { sent: true }
      }
      lastError = `formsubmit:${res.status}`
    } catch (e) {
      lastError = `formsubmit-exception:${String(e).slice(0, 120)}`
    }
  }

  return { sent: false, reason: lastError }
}


/* ==========================================================================
 *  CONFIRMING THE BOOKING TO THE GUEST
 * ==========================================================================
 *
 *  This is a different problem from notifying ourselves, and it is worth being
 *  explicit about why only one provider appears below.
 *
 *    • Web3Forms delivers to the address that owns the access key. It cannot
 *      be pointed at a customer, so it is useless here.
 *    • FormSubmit requires the RECIPIENT to click an activation link first.
 *      Asking a paying guest to activate their own confirmation is absurd.
 *    • Resend sends to any address once a sending domain is verified.
 *
 *  So a guest confirmation needs RESEND_API_KEY and a NOTIFY_FROM on a domain
 *  verified with Resend. Without it this returns `sent: false` and the caller
 *  tells the team to follow up by hand — it never pretends an email went out.
 * ========================================================================== */

export interface BookingConfirmation {
  to: string
  firstName: string
  experienceTitle: string
  tierLabel: string
  date: string
  guests: number
  amountLabel: string
  breakdown: string
  paymentId: string
  /** Shown as "what to bring", when the experience lists it. */
  bring?: string[]
  /** Set for the workshops that send a guest home with a print. */
  souvenir?: boolean
  directionsUrl: string
  siteUrl: string
}

function prettyDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00+05:30`)
  return Number.isNaN(d.getTime())
    ? iso
    : // Explicitly IST: the servers run UTC, and a booking date rendered a day
      // early in a guest's own confirmation email is not a cosmetic problem.
      d.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
}

export function confirmationSubject(c: BookingConfirmation): string {
  return `Confirmed — ${c.experienceTitle}, ${prettyDate(c.date)}`
}

/** The email a guest actually receives. Plain, specific, and personal. */
export function confirmationHtml(c: BookingConfirmation): string {
  const e = escapeHtml
  const rows: [string, string][] = [
    ['Experience', c.experienceTitle],
    ['Package', c.tierLabel],
    ['Date', prettyDate(c.date)],
    ['Guests', String(c.guests)],
    ['Paid', `${c.amountLabel} (${c.breakdown})`],
    ['Payment ID', c.paymentId],
  ]

  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f6f8;padding:28px 14px">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e6ec">

      <div style="background:#0b0b14;padding:28px 30px">
        <p style="margin:0;color:#e8b44a;font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:700">
          Nakshatraalay Gurgaon
        </p>
        <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:500;line-height:1.25">
          You&rsquo;re booked, ${e(c.firstName)}.
        </h1>
        <p style="margin:8px 0 0;color:rgba(255,255,255,.62);font-size:14px;line-height:1.55">
          Your payment went through and your place is held. Nothing else to do — just turn up.
        </p>
      </div>

      <div style="padding:26px 30px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows
            .map(
              ([k, v], i) =>
                `<tr>
                   <td style="padding:11px 0;color:#6b6b7b;width:38%;${i ? 'border-top:1px solid #eeeef2' : ''}">${e(k)}</td>
                   <td style="padding:11px 0;color:#0b0b14;font-weight:600;${i ? 'border-top:1px solid #eeeef2' : ''}">${e(v)}</td>
                 </tr>`
            )
            .join('')}
        </table>

        <a href="${e(c.directionsUrl)}"
           style="display:block;margin:24px 0 0;background:#e8b44a;color:#0b0b14;text-decoration:none;text-align:center;padding:14px 20px;border-radius:999px;font-weight:700;font-size:14px">
          Get directions
        </a>
        <p style="margin:10px 0 0;text-align:center;color:#9a9aab;font-size:12px">
          Sessions start at dusk. The sky doesn&rsquo;t wait, so please don&rsquo;t be late.
        </p>

        ${
          c.souvenir
            ? `<div style="margin:24px 0 0;padding:16px 18px;background:#fdf6e8;border:1px solid #f0dfb8;border-radius:12px">
                 <p style="margin:0;color:#7a5a12;font-size:13px;line-height:1.6">
                   <strong>Before you leave</strong> we&rsquo;ll print one of the photographs you took
                   during the night, for you to take home.
                 </p>
               </div>`
            : ''
        }

        ${
          c.bring?.length
            ? `<h2 style="margin:26px 0 8px;font-size:14px;color:#0b0b14;font-weight:700">What to bring</h2>
               <ul style="margin:0;padding-left:18px;color:#4a4a5a;font-size:13px;line-height:1.85">
                 ${c.bring.map((b) => `<li>${e(b)}</li>`).join('')}
               </ul>`
            : ''
        }

        <div style="margin:26px 0 0;padding:16px 18px;background:#f6f6f8;border-radius:12px">
          <p style="margin:0;color:#4a4a5a;font-size:13px;line-height:1.65">
            <strong style="color:#0b0b14">If the sky clouds over</strong> we still run the session —
            telescope walkthroughs, theory and processing indoors, and we use every clear window we get.
          </p>
        </div>

        <p style="margin:22px 0 0;color:#6b6b7b;font-size:12px;line-height:1.75">
          Need to change your date? Reply to this email quoting your payment ID, and read the
          <a href="${e(c.siteUrl)}/nakshatraalay/gurgaon/rescheduling" style="color:#0b0b14">rescheduling</a> and
          <a href="${e(c.siteUrl)}/nakshatraalay/gurgaon/cancellation" style="color:#0b0b14">cancellation</a> terms.
        </p>
      </div>

      <div style="padding:16px 30px 24px;border-top:1px solid #eeeef2">
        <p style="margin:0;color:#9a9aab;font-size:11px;line-height:1.7">
          Nakshatraalay Gurgaon by Astris Space · This is your booking record — keep it.
        </p>
      </div>
    </div>
  </div>`
}

export function confirmationText(c: BookingConfirmation): string {
  return [
    `You're booked, ${c.firstName}.`,
    '',
    `${c.experienceTitle} — ${c.tierLabel}`,
    `${prettyDate(c.date)} · ${c.guests} guest${c.guests === 1 ? '' : 's'}`,
    `Paid ${c.amountLabel} (${c.breakdown})`,
    `Payment ID: ${c.paymentId}`,
    '',
    `Directions: ${c.directionsUrl}`,
    'Sessions start at dusk — please do not be late.',
    c.souvenir ? 'Before you leave we will print one of your own photographs to take home.' : '',
    c.bring?.length ? `\nWhat to bring:\n${c.bring.map((b) => `- ${b}`).join('\n')}` : '',
    '',
    'If the sky clouds over we still run the session indoors.',
    `Rescheduling: ${c.siteUrl}/nakshatraalay/gurgaon/rescheduling`,
    `Cancellation: ${c.siteUrl}/nakshatraalay/gurgaon/cancellation`,
  ]
    .filter(Boolean)
    .join('\n')
}

/**
 * Email the guest. Requires Resend; see the note above for why.
 */
export async function sendCustomerConfirmation(
  c: BookingConfirmation
): Promise<{ sent: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false, reason: 'resend-not-configured' }

  const from = process.env.NOTIFY_FROM
  if (!from) return { sent: false, reason: 'notify-from-not-configured' }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [c.to],
        reply_to: NOTIFY_RECIPIENTS[0],
        subject: confirmationSubject(c),
        html: confirmationHtml(c),
        text: confirmationText(c),
      }),
    })
    if (res.ok) return { sent: true }
    return { sent: false, reason: `resend:${res.status} ${(await res.text().catch(() => '')).slice(0, 160)}` }
  } catch (e) {
    return { sent: false, reason: `resend-exception:${String(e).slice(0, 160)}` }
  }
}
