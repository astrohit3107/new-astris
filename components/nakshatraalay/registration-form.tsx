'use client'

import { useMemo, useState } from 'react'
import { Check, AlertCircle, Loader2, MessageCircle, Copy, Smartphone } from 'lucide-react'

import {
  getExperience,
  formatINR,
  isClosed,
  earliestBookableDate,
  type PriceTier,
} from '@/lib/nakshatraalay-data'
import { PAYMENT_DETAILS, upiReady, bankReady, upiHref } from '@/lib/payment-details'
import { whatsappHref, CONTACT } from '@/lib/site-config'

/**
 * Register, then pay by UPI or bank transfer.
 *
 * Used while there is no payment gateway. The registration is saved to the
 * registrations Google Sheet (and emailed to the team) before any payment
 * details are shown, so every enquiry is captured whether or not the guest
 * goes on to pay.
 */

type Status = 'idle' | 'sending' | 'done' | 'error'

interface Receipt {
  registrationId: string
  amount: number
  amountLabel: string
  breakdown: string
  experienceTitle: string
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/10 py-2.5 first:border-t-0">
      <span className="text-xs text-white/45">{label}</span>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(value).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
        }}
        className="flex min-w-0 items-center gap-1.5 text-right font-mono text-sm text-white hover:text-[var(--av-gold)]"
      >
        <span className="truncate">{value}</span>
        {copied ? <Check size={13} className="shrink-0 text-emerald-300" /> : <Copy size={13} className="shrink-0 text-white/40" />}
      </button>
    </div>
  )
}

export default function RegistrationForm({ experienceSlug }: { experienceSlug: string }) {
  const experience = getExperience(experienceSlug)
  const tiers: PriceTier[] = useMemo(() => experience?.priceTiers ?? [], [experience])

  const [tierLabel, setTierLabel] = useState(tiers[0]?.label ?? '')
  const [guests, setGuests] = useState(tiers[0]?.perPerson ? 1 : 2)
  const [date, setDate] = useState('')
  const [fullName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [refCode, setRefCode] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  const tier = tiers.find((t) => t.label === tierLabel)
  const preview = tier ? (tier.perPerson ? tier.amount * guests : tier.amount) : 0
  const earliest = earliestBookableDate()
  const dateClosed = date !== '' && isClosed(date)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!date) { setError('Please choose a date.'); return }
    if (dateClosed) { setError('That night is already full. Please pick another date.'); return }

    setStatus('sending')
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceSlug, tierLabel, guests, date,
          fullName, email, phone, notes, refCode,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.error || 'We could not save your registration.')
      if (json.skipped) {
        setStatus('error')
        setError('We could not verify this form automatically. Please message us on WhatsApp to register.')
        return
      }
      setReceipt(json)
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (!experience) return null

  /* ---------------------------------------------------------------- *
   *  Registered — now show how to pay.
   * ---------------------------------------------------------------- */
  if (status === 'done' && receipt) {
    const paid = whatsappHref(
      `Hi Nakshatraalay — I've paid ${receipt.amountLabel} for ${receipt.experienceTitle} on ${date}. ` +
        `Registration ID: ${receipt.registrationId}. Sharing the payment screenshot.`
    )
    return (
      <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Check size={24} />
          </span>
          <h3 className="font-display mt-4 text-2xl font-semibold text-white">You&rsquo;re registered</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">
            Pay <span className="font-semibold text-white">{receipt.amountLabel}</span> to confirm your
            place. Put your registration ID in the payment note.
          </p>
          <p className="mt-3 inline-block rounded-full border border-[var(--av-gold)]/40 bg-[var(--av-gold)]/10 px-4 py-1.5 font-mono text-sm text-[var(--av-gold)]">
            {receipt.registrationId}
          </p>
        </div>

        {upiReady && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Pay by UPI</p>
            {PAYMENT_DETAILS.upi.qrImage && (
              <img
                src={PAYMENT_DETAILS.upi.qrImage}
                alt={`UPI QR code for ${PAYMENT_DETAILS.upi.payeeName}`}
                className="mx-auto mt-4 w-48 rounded-xl bg-white p-2"
              />
            )}
            <div className="mt-4">
              <CopyRow label="UPI ID" value={PAYMENT_DETAILS.upi.id} />
              <CopyRow label="Amount" value={String(receipt.amount)} />
            </div>
            <a
              href={upiHref(receipt.amount, receipt.registrationId)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 sm:hidden"
            >
              <Smartphone size={16} /> Open UPI app
            </a>
          </div>
        )}

        {bankReady && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Or bank transfer (NEFT / IMPS)
            </p>
            <div className="mt-3">
              <CopyRow label="Account name" value={PAYMENT_DETAILS.bank.accountName} />
              <CopyRow label="Account no." value={PAYMENT_DETAILS.bank.accountNumber} />
              <CopyRow label="IFSC" value={PAYMENT_DETAILS.bank.ifsc} />
              <CopyRow label="Bank" value={`${PAYMENT_DETAILS.bank.bankName}, ${PAYMENT_DETAILS.bank.branch}`} />
            </div>
          </div>
        )}

        {!upiReady && !bankReady && (
          <p className="mt-6 text-center text-sm text-white/60">
            We&rsquo;ll message you on {phone} with payment details shortly.
          </p>
        )}

        <a
          href={paid}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50"
        >
          <MessageCircle size={16} /> Paid? Send us the screenshot
        </a>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/35">
          Your place is confirmed once we see the payment — usually within a few hours. Questions? Call{' '}
          {CONTACT.phone}.
        </p>
      </div>
    )
  }

  const field =
    'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--av-gold)]/60 focus:bg-white/[0.07]'
  const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50'

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-white">Register for this night</h3>
      <p className="mt-1.5 text-sm text-white/50">
        Register here, then pay by UPI or bank transfer to confirm.
      </p>

      {/* Honeypot — see reservation-form for why it has no label. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          name="refCode"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <span className={label}>Package</span>
          <div className="space-y-2">
            {tiers.map((t) => {
              const active = t.label === tierLabel
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => { setTierLabel(t.label); if (!t.perPerson) setGuests(2) }}
                  aria-pressed={active}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    active ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/10' : 'border-white/12 hover:border-white/30'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.label}</span>
                    {t.note && <span className="mt-0.5 block text-xs text-white/45">{t.note}</span>}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-white">
                    {formatINR(t.amount)}
                    <span className="ml-1 text-[10px] font-normal uppercase text-white/40">
                      {t.perPerson ? 'pp' : 'total'}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="rg-date">Date</label>
            <input id="rg-date" type="date" min={earliest} required value={date}
              onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:dark]`} />
            {dateClosed && (
              <p className="mt-1.5 text-xs text-amber-200/90">That night is full — please pick another.</p>
            )}
          </div>
          <div>
            <label className={label} htmlFor="rg-guests">Guests</label>
            <input id="rg-guests" type="number" min={1} max={30} required value={guests}
              disabled={tier ? !tier.perPerson : false}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
              className={`${field} disabled:opacity-50`} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="rg-name">Full name</label>
            <input id="rg-name" required value={fullName} onChange={(e) => setName(e.target.value)}
              className={field} placeholder="Your name" />
          </div>
          <div>
            <label className={label} htmlFor="rg-phone">Phone / WhatsApp</label>
            <input id="rg-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              className={field} placeholder="+91 …" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="rg-email">Email</label>
            <input id="rg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className={field} placeholder="you@email.com" />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="rg-notes">Anything else? <span className="normal-case text-white/30">(optional)</span></label>
          <textarea id="rg-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
            className={`${field} resize-none`} placeholder="Occasion, dietary needs, accessibility…" />
        </div>

        <div className="flex items-baseline justify-between rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
          <span className="text-sm text-white/55">
            Amount to pay
            {tier?.perPerson && <span className="ml-1 text-xs text-white/35">({formatINR(tier.amount)} × {guests})</span>}
          </span>
          <span className="font-display text-2xl font-semibold text-white">{formatINR(preview)}</span>
        </div>

        {error && (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
          </p>
        )}

        <button type="submit" disabled={status === 'sending' || dateClosed}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Registering…</> : 'Register & see payment details'}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-white/35">
          By registering you accept our{' '}
          <a href="/nakshatraalay/gurgaon/cancellation" className="underline hover:text-white/70">
            cancellation &amp; refund terms
          </a>{' '}
          and{' '}
          <a href="/nakshatraalay/gurgaon/privacy" className="underline hover:text-white/70">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}
