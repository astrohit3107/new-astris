'use client'

import { useEffect, useMemo, useState } from 'react'
import { CreditCard, Check, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'

import {
  getExperience,
  formatINR,
  isClosed,
  POLICIES,
  type PriceTier,
} from '@/lib/nakshatraalay-data'
import { GEAR_OPTIONS, asksForGear } from '@/lib/reservations'
import { whatsappHref } from '@/lib/site-config'

/**
 * Reserve and pay.
 *
 * The total shown here is a preview only — the server reprices from the
 * catalogue before it opens a Razorpay order, so editing anything in the page
 * changes what is displayed and nothing that is charged.
 */

declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void } }
}

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

function useRazorpayScript() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (window.Razorpay) { setReady(true); return }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`)
    const el = existing ?? Object.assign(document.createElement('script'), { src: CHECKOUT_SRC, async: true })
    const onLoad = () => setReady(true)
    el.addEventListener('load', onLoad)
    if (!existing) document.body.appendChild(el)
    return () => el.removeEventListener('load', onLoad)
  }, [])
  return ready
}

type Status = 'idle' | 'starting' | 'paying' | 'confirming' | 'done' | 'error'

export default function ReservationForm({ experienceSlug }: { experienceSlug: string }) {
  const experience = getExperience(experienceSlug)
  const tiers: PriceTier[] = useMemo(() => experience?.priceTiers ?? [], [experience])
  const scriptReady = useRazorpayScript()
  const wantsGear = asksForGear(experienceSlug)

  const [tierLabel, setTierLabel] = useState(tiers[0]?.label ?? '')
  const [guests, setGuests] = useState(tiers[0]?.perPerson ? 1 : 2)
  const [date, setDate] = useState('')
  const [fullName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gear, setGear] = useState<string[]>([])
  const [gearNotes, setGearNotes] = useState('')
  const [notes, setNotes] = useState('')
  const [company, setCompany] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<{ paymentId: string; amountLabel: string } | null>(null)

  const tier = tiers.find((t) => t.label === tierLabel)
  const preview = tier ? (tier.perPerson ? tier.amount * guests : tier.amount) : 0
  const today = new Date().toISOString().slice(0, 10)
  const dateClosed = date !== '' && isClosed(date)
  const busy = status === 'starting' || status === 'paying' || status === 'confirming'

  function payload() {
    return {
      experienceSlug, tierLabel, guests, date,
      fullName, email, phone,
      gear, gearNotes, notes, company,
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!scriptReady) { setError('Payment is still loading — try again in a moment.'); return }
    if (dateClosed) { setError('That night is already full. Please pick another date.'); return }

    setStatus('starting')
    try {
      const res = await fetch('/api/reservations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      })
      const order = await res.json()
      if (!res.ok || !order.ok) throw new Error(order.error || 'Could not start the payment.')
      if (order.skipped) { setStatus('done'); return }

      setStatus('paying')
      const rzp = new window.Razorpay!({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: 'Nakshatraalay Gurgaon',
        description: `${order.quote.experienceTitle} — ${order.quote.tierLabel}`,
        prefill: { name: fullName, email, contact: phone },
        notes: { date, guests: String(guests) },
        theme: { color: '#0b0b14' },
        modal: {
          ondismiss: () => {
            setStatus('idle')
            setError('Payment was cancelled. Nothing has been charged.')
          },
        },
        handler: async (r: Record<string, string>) => {
          setStatus('confirming')
          try {
            const cres = await fetch('/api/reservations/confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...payload(),
                razorpayOrderId: r.razorpay_order_id,
                razorpayPaymentId: r.razorpay_payment_id,
                razorpaySignature: r.razorpay_signature,
              }),
            })
            const cj = await cres.json()
            if (!cres.ok || !cj.ok) throw new Error(cj.error || 'We could not verify the payment.')
            setReceipt({ paymentId: cj.paymentId, amountLabel: cj.amountLabel })
            setStatus('done')
          } catch (err) {
            setStatus('error')
            setError(
              err instanceof Error
                ? `${err.message} If you have been charged, send us your payment ID and we will sort it out immediately.`
                : 'Verification failed.'
            )
          }
        },
      })
      rzp.open()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (!experience) return null

  if (status === 'done') {
    return (
      <div className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.06] p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check size={28} />
        </span>
        <h3 className="font-display mt-5 text-2xl font-semibold text-white">Your spot is booked</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/65">
          {receipt ? `We've received ${receipt.amountLabel}.` : 'Payment received.'} A confirmation
          is on its way to {email}. We&rsquo;ll be in touch before the night with directions and
          what to expect.
        </p>
        {receipt && (
          <p className="mt-4 font-mono text-xs text-white/45">Payment ID · {receipt.paymentId}</p>
        )}
      </div>
    )
  }

  const field =
    'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--av-gold)]/60 focus:bg-white/[0.07]'
  const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50'

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-white">Reserve your spot</h3>
      <p className="mt-1.5 text-sm text-white/50">Secure your place with payment — confirmed instantly.</p>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="rf-company">Company</label>
        <input id="rf-company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
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
            <label className={label} htmlFor="rf-date">Date</label>
            <input id="rf-date" type="date" min={today} required value={date}
              onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:dark]`} />
            {dateClosed && (
              <p className="mt-1.5 text-xs text-amber-200/90">That night is full — please pick another.</p>
            )}
          </div>
          <div>
            <label className={label} htmlFor="rf-guests">Guests</label>
            <input id="rf-guests" type="number" min={1} max={30} required value={guests}
              disabled={tier ? !tier.perPerson : false}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
              className={`${field} disabled:opacity-50`} />
            {tier && !tier.perPerson && (
              <p className="mt-1.5 text-xs text-white/40">This package is priced for the whole party.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="rf-name">Full name</label>
            <input id="rf-name" required value={fullName} onChange={(e) => setName(e.target.value)}
              className={field} placeholder="Your name" />
          </div>
          <div>
            <label className={label} htmlFor="rf-phone">Phone</label>
            <input id="rf-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
              className={field} placeholder="+91 …" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="rf-email">Email</label>
            <input id="rf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className={field} placeholder="you@email.com" />
          </div>
        </div>

        {/* Gear — only where it actually matters */}
        {wantsGear && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <span className={label}>What gear are you bringing?</span>
            <p className="-mt-0.5 mb-3 text-xs text-white/45">
              So we can plan mounts, adapters and who needs to share a rig.
            </p>
            <div className="flex flex-wrap gap-2">
              {GEAR_OPTIONS.map((g) => {
                const on = gear.includes(g)
                return (
                  <button key={g} type="button" aria-pressed={on}
                    onClick={() => setGear((prev) => (on ? prev.filter((x) => x !== g) : [...prev, g]))}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                      on ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/15 text-white' : 'border-white/15 text-white/65 hover:border-white/35'
                    }`}>
                    {g}
                  </button>
                )
              })}
            </div>
            <input value={gearNotes} onChange={(e) => setGearNotes(e.target.value)}
              className={`${field} mt-3`} placeholder="Camera and lens models, if you know them" />
          </div>
        )}

        <div>
          <label className={label} htmlFor="rf-notes">Anything else? <span className="normal-case text-white/30">(optional)</span></label>
          <textarea id="rf-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
            className={`${field} resize-none`} placeholder="Occasion, dietary needs, accessibility…" />
        </div>

        {/* Total */}
        <div className="flex items-baseline justify-between rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
          <span className="text-sm text-white/55">
            Total
            {tier?.perPerson && <span className="ml-1 text-xs text-white/35">({formatINR(tier.amount)} × {guests})</span>}
          </span>
          <span className="font-display text-2xl font-semibold text-white">{formatINR(preview)}</span>
        </div>

        {error && (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
          </p>
        )}

        <button type="submit" disabled={busy || dateClosed}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? <><Loader2 size={16} className="animate-spin" />
            {status === 'confirming' ? 'Confirming payment…' : status === 'paying' ? 'Waiting for payment…' : 'Starting…'}</>
            : <><CreditCard size={16} /> Pay {formatINR(preview)} & reserve</>}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/35">
          <ShieldCheck size={12} /> Payment handled by Razorpay. We never see your card details.
        </p>
        <p className="text-center text-[11px] leading-relaxed text-white/30">
          {POLICIES.weather}{' '}
          <a href={whatsappHref(`Hello Astris Space — a question about booking ${experience.title}.`)}
            target="_blank" rel="noopener noreferrer" className="text-white/50 underline underline-offset-2">
            Questions? Message us.
          </a>
        </p>
      </div>
    </form>
  )
}
