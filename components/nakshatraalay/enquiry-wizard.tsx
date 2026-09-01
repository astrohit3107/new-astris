'use client'

import { useState } from 'react'
import { MessageCircle, ArrowRight, ArrowLeft, Check } from 'lucide-react'

import { whatsappHref } from '@/lib/site-config'
import {
  NAKSHATRAALAY,
  experiences,
  formatINR,
  isClosed,
  POLICIES,
  type PriceTier,
} from '@/lib/nakshatraalay-data'

/**
 * The booking flow, without a booking database.
 *
 * WHAT THIS IS
 * ------------
 * A guided way to say what you want, which ends in a WhatsApp message with
 * every answer already written into it. That is the whole mechanism — there
 * is no payment step and no seat is held, because this site has neither an
 * inventory ledger nor a gateway.
 *
 * WHAT IT REFUSES TO DO
 * ---------------------
 * It never shows availability or "seats left". Implying a live count without
 * a database behind it would be a lie that costs someone a wasted drive.
 * The final step says plainly that the date is confirmed by reply.
 */

const STEPS = ['Experience', 'Date', 'Guests', 'Send'] as const

export default function EnquiryWizard({
  initialExperienceSlug,
}: {
  initialExperienceSlug?: string
}) {
  const [step, setStep] = useState(initialExperienceSlug ? 1 : 0)
  const [experienceSlug, setExperienceSlug] = useState(initialExperienceSlug ?? '')
  const [date, setDate] = useState('')
  const [flexible, setFlexible] = useState(false)
  const [guests, setGuests] = useState(2)
  const [tierLabelSel, setTierLabelSel] = useState('')
  const [note, setNote] = useState('')

  const experience = experiences.find((e) => e.slug === experienceSlug)
  const tiers: PriceTier[] = experience?.priceTiers ?? []
  const chosenTier = tiers.find((t) => t.label === tierLabelSel) ?? tiers[0]
  const dateClosed = date !== '' && isClosed(date)
  const today = new Date().toISOString().slice(0, 10)

  const canAdvance =
    (step === 0 && experienceSlug !== '') ||
    (step === 1 && (flexible || (date !== '' && !dateClosed))) ||
    step === 2 ||
    step === 3

  const message = [
    `Hello Astris Space — I'd like to enquire about ${NAKSHATRAALAY.name}.`,
    '',
    `Experience: ${experience?.title ?? 'Not sure yet'}`,
    `Preferred date: ${flexible ? "I'm flexible" : date || 'Not sure yet'}`,
    `Guests: ${guests}`,
    chosenTier
      ? `Option: ${chosenTier.label} — ${formatINR(chosenTier.amount)} ${
          chosenTier.perPerson ? 'per person' : 'total'
        }`
      : '',
    chosenTier
      ? `Estimated total: ${formatINR(
          chosenTier.perPerson ? chosenTier.amount * guests : chosenTier.amount,
        )}`
      : '',
    note ? `\nNote: ${note}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const href = whatsappHref(message)

  const box =
    'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40 focus:bg-white/[0.07]'
  const label = 'mb-2 block text-[11px] font-semibold uppercase tracking-wider text-white/50'

  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Enquiry steps">
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          return (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                aria-current={active ? 'step' : undefined}
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition ${
                  done
                    ? 'bg-[var(--av-gold)] text-black'
                    : active
                      ? 'bg-white text-black'
                      : 'border border-white/20 text-white/40'
                }`}
              >
                {done ? <Check size={13} /> : i + 1}
              </span>
              <span className={`hidden text-xs sm:inline ${active ? 'text-white' : 'text-white/40'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-white/10" />}
            </li>
          )
        })}
      </ol>

      {/* Step 1 — experience */}
      {step === 0 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-white">What would you like to do?</h3>
          <div className="mt-5 space-y-2">
            {experiences.map((exp) => (
              <button
                key={exp.slug}
                type="button"
                onClick={() => setExperienceSlug(exp.slug)}
                aria-pressed={experienceSlug === exp.slug}
                className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  experienceSlug === exp.slug
                    ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/10'
                    : 'border-white/12 bg-white/[0.02] hover:border-white/30'
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">{exp.title}</span>
                  <span className="mt-0.5 block text-xs text-white/50">{exp.durationLabel}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — date */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-white">Which night?</h3>
          <p className="mt-2 text-sm text-white/50">
            Dark, moonless nights are best for faint objects — the sky calendar can help you pick.
          </p>
          <div className="mt-5">
            <label className={label} htmlFor="ew-date">Preferred date</label>
            <input
              id="ew-date"
              type="date"
              min={today}
              value={date}
              disabled={flexible}
              onChange={(e) => setDate(e.target.value)}
              className={`${box} disabled:opacity-40 [color-scheme:dark]`}
            />
          </div>
          {dateClosed && (
            <p role="alert" className="mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100/90">
              That night is already full. Try another date, or tick &ldquo;I&rsquo;m flexible&rdquo;
              and we&rsquo;ll suggest one.
            </p>
          )}

          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
              className="h-4 w-4 rounded border-white/30 bg-white/5 accent-[var(--av-gold)]"
            />
            I&rsquo;m flexible — suggest a good night
          </label>
        </div>
      )}

      {/* Step 3 — party & rate */}
      {step === 2 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-white">Who&rsquo;s coming?</h3>

          <div className="mt-5">
            <label className={label} htmlFor="ew-guests">Number of guests</label>
            <input
              id="ew-guests"
              type="number"
              min={1}
              max={60}
              value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
              className={box}
            />
          </div>

          {tiers.length > 0 && (
            <div className="mt-6 space-y-2">
              <span className={label}>
                {tiers.length > 1 ? 'How would you like to stay?' : 'Price'}
              </span>
              {tiers.map((tier) => {
                const active = chosenTier?.label === tier.label
                const total = tier.perPerson ? tier.amount * guests : tier.amount
                return (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setTierLabelSel(tier.label)}
                    aria-pressed={active}
                    className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/10'
                        : 'border-white/12 bg-white/[0.02] hover:border-white/30'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-white">{tier.label}</span>
                      <span className="mt-0.5 block text-xs text-white/50">
                        {formatINR(tier.amount)} {tier.perPerson ? 'per person' : 'total'}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-semibold text-white">
                        {formatINR(total)}
                      </span>
                      <span className="block text-[10px] uppercase tracking-wide text-white/40">
                        {tier.perPerson ? `for ${guests}` : 'total'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-5">
            <label className={label} htmlFor="ew-note">Anything else? <span className="normal-case text-white/30">(optional)</span></label>
            <textarea
              id="ew-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Occasion, accessibility needs, questions…"
              className={`${box} resize-none placeholder:text-white/30`}
            />
          </div>
        </div>
      )}

      {/* Step 4 — send */}
      {step === 3 && (
        <div>
          <h3 className="font-display text-xl font-semibold text-white">Send your enquiry</h3>
          <dl className="mt-5 divide-y divide-white/10 rounded-xl border border-white/12 bg-white/[0.02] text-sm">
            {[
              ['Experience', experience?.title ?? 'Not sure yet'],
              ['Date', flexible ? "Flexible" : date || 'Not sure yet'],
              ['Guests', String(guests)],
              ...(chosenTier
                ? ([
                    ['Option', chosenTier.label],
                    [
                      'Estimated total',
                      formatINR(
                        chosenTier.perPerson ? chosenTier.amount * guests : chosenTier.amount,
                      ),
                    ],
                  ] as [string, string][])
                : []),
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                <dt className="text-white/45">{k}</dt>
                <dd className="text-right font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs leading-relaxed text-white/40">
            {POLICIES.capacity} We&rsquo;ll confirm the date and everything else by reply — nothing
            is booked or charged from this page.
          </p>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110"
          >
            <MessageCircle size={16} /> Send on WhatsApp
          </a>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 disabled:invisible"
        >
          <ArrowLeft size={14} /> Back
        </button>
        {step < STEPS.length - 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            disabled={!canAdvance}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)] disabled:opacity-40"
          >
            Continue <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
