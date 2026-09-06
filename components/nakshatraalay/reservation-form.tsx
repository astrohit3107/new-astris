'use client'

import { useEffect, useMemo, useState } from 'react'
import { CreditCard, Check, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'

import {
  getExperience,
  formatINR,
  isClosed,
  POLICIES,
  earliestBookableDate,
  MAPS,
  type PriceTier,
} from '@/lib/nakshatraalay-data'
import { GEAR_OPTIONS, asksForGear } from '@/lib/reservations'
import { whatsappHref } from '@/lib/site-config'

/**
 * Reserve and pay.
 *
 * The total shown here is a preview only — the server reprices from the
 * catalogue before it opens a Cashfree order, so editing anything in the page
 * changes what is displayed and nothing that is charged.
 */

interface CashfreeCheckoutResult {
  error?: { message?: string }
  paymentDetails?: { paymentMessage?: string }
}

declare global {
  interface Window {
    Cashfree?: (config: { mode: string }) => {
      checkout: (opts: {
        paymentSessionId: string
        redirectTarget?: string
      }) => Promise<CashfreeCheckoutResult>
    }
  }
}

const CHECKOUT_SRC = 'https://sdk.cashfree.com/js/v3/cashfree.js'

function useCashfreeScript() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (window.Cashfree) { setReady(true); return }
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
  const scriptReady = useCashfreeScript()
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
  const [refCode, setRefCode] = useState('')

  // Seats left on the chosen night, read from the booking ledger. `null`
  // means we have not asked yet or could not tell — never rendered as "free".
  const [slots, setSlots] = useState<{ state: string; remaining: number | null; label: string } | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<{ paymentId: string; amountLabel: string; emailed: boolean } | null>(null)

  // Ask about the chosen night only. A whole calendar of counts is a bigger
  // read than this form needs.
  useEffect(() => {
    if (!date || experience?.slotsPerNight == null) { setSlots(null); return }
    let cancelled = false
    setSlotsLoading(true)
    fetch(`/api/availability?slug=${encodeURIComponent(experienceSlug)}&from=${date}&days=1`)
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return
        setSlots(j?.days?.[date] ?? null)
      })
      .catch(() => { if (!cancelled) setSlots(null) })
      .finally(() => { if (!cancelled) setSlotsLoading(false) })
    return () => { cancelled = true }
  }, [date, experienceSlug, experience?.slotsPerNight])

  const soldOut = slots?.state === 'full' || slots?.state === 'closed'
  const notEnoughRoom =
    slots?.state === 'open' && slots.remaining !== null && slots.remaining < guests

  const tier = tiers.find((t) => t.label === tierLabel)
  const preview = tier ? (tier.perPerson ? tier.amount * guests : tier.amount) : 0
  // Opening day, or today once opening has passed. Booking a night before the
  // property opens would take real money for a date that cannot happen.
  const earliest = earliestBookableDate()
  const dateClosed = date !== '' && isClosed(date)
  const busy = status === 'starting' || status === 'paying' || status === 'confirming'

  function payload() {
    return {
      experienceSlug, tierLabel, guests, date,
      fullName, email, phone,
      gear, gearNotes, notes, refCode,
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!scriptReady) { setError('Payment is still loading — try again in a moment.'); return }
    if (dateClosed) { setError('That night is already full. Please pick another date.'); return }
    if (soldOut) { setError('That night is fully booked. Please pick another date.'); return }
    if (notEnoughRoom) {
      setError(`Only ${slots?.remaining} place${slots?.remaining === 1 ? '' : 's'} left on that night.`)
      return
    }

    setStatus('starting')
    try {
      const res = await fetch('/api/reservations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      })
      const order = await res.json()
      if (!res.ok || !order.ok) throw new Error(order.error || 'Could not start the payment.')
      // Never show a receipt for a booking that was never charged. If the trap
      // ever misfires on a real person, give them a way through instead.
      if (order.skipped) {
        setStatus('error')
        setError('We could not verify this form automatically. Please message us on WhatsApp and we will hold your place.')
        return
      }

      setStatus('paying')
      const cashfree = window.Cashfree!({ mode: order.mode === 'production' ? 'production' : 'sandbox' })

      // The modal resolves when checkout finishes — but "finished" is not
      // "paid". Cashfree gives the browser no signature, so the server decides
      // by asking Cashfree directly. This result only tells us to go and ask.
      const outcome = await cashfree.checkout({
        paymentSessionId: order.paymentSessionId,
        redirectTarget: '_modal',
      })

      if (outcome?.error) {
        setStatus('idle')
        setError(outcome.error.message || 'Payment was not completed. Nothing has been charged.')
        return
      }

      setStatus('confirming')
      const cres = await fetch('/api/reservations/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload(), orderId: order.orderId }),
      })
      const cj = await cres.json()
      if (!cres.ok || !cj.ok) throw new Error(cj.error || 'We could not verify the payment.')
      setReceipt({ paymentId: cj.paymentId, amountLabel: cj.amountLabel, emailed: !!cj.emailed })
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error
          ? `${err.message} If you have been charged, send us your order ID and we will sort it out immediately.`
          : 'Something went wrong.'
      )
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
          {receipt ? `We've received ${receipt.amountLabel}.` : 'Payment received.'}{' '}
          {receipt?.emailed
            ? `A confirmation with your booking details is on its way to ${email}.`
            : `We'll message you on ${phone} with your confirmation and directions shortly.`}
        </p>
        {receipt && (
          <>
            <p className="mt-4 font-mono text-xs text-white/45">
              Payment ID · {receipt.paymentId}
            </p>
            <p className="mt-1.5 text-xs text-white/40">
              Keep this — it identifies your booking if you need to change the date.
            </p>
            <a
              href={MAPS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium text-white/85 transition hover:border-white/40 hover:bg-white/5"
            >
              Get directions
            </a>
          </>
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

      {/* Honeypot. No label and a meaningless name, so browser autofill has
          nothing to match — a visible "Company" label made Chrome fill it from
          the saved address profile and blocked real customers. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          id="rf-refcode"
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
            <label className={label} htmlFor="rf-date">Date</label>
            <input id="rf-date" type="date" min={earliest} required value={date}
              onChange={(e) => setDate(e.target.value)} className={`${field} [color-scheme:dark]`} />
            {dateClosed ? (
              <p className="mt-1.5 text-xs text-amber-200/90">That night is full — please pick another.</p>
            ) : slotsLoading ? (
              <p className="mt-1.5 text-xs text-white/35">Checking availability…</p>
            ) : slots ? (
              <p
                className={`mt-1.5 text-xs ${
                  slots.state === 'full' || slots.state === 'closed'
                    ? 'text-amber-200/90'
                    : slots.remaining !== null && slots.remaining <= 3
                      ? 'text-[var(--av-gold)]'
                      : 'text-white/45'
                }`}
              >
                {slots.label}
              </p>
            ) : null}
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

        <button type="submit" disabled={busy || dateClosed || soldOut || notEnoughRoom}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? <><Loader2 size={16} className="animate-spin" />
            {status === 'confirming' ? 'Confirming payment…' : status === 'paying' ? 'Waiting for payment…' : 'Starting…'}</>
            : soldOut ? 'Fully booked — choose another night'
            : notEnoughRoom ? `Only ${slots?.remaining} left on that night`
            : <><CreditCard size={16} /> Pay {formatINR(preview)} & reserve</>}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/35">
          <ShieldCheck size={12} /> Payment handled by Cashfree. We never see your card details.
        </p>
        {/* The terms a guest is agreeing to by paying must be reachable from
            the point of payment, not buried in a footer. */}
        <p className="text-center text-[11px] leading-relaxed text-white/35">
          By paying you accept our{' '}
          <a href="/nakshatraalay/gurgaon/cancellation" className="underline hover:text-white/70">
            cancellation &amp; refund terms
          </a>
          ,{' '}
          <a href="/nakshatraalay/gurgaon/rescheduling" className="underline hover:text-white/70">
            rescheduling policy
          </a>{' '}
          and{' '}
          <a href="/nakshatraalay/gurgaon/privacy" className="underline hover:text-white/70">
            privacy policy
          </a>
          .
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
