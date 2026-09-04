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
