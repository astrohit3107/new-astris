'use client'

import { useState } from 'react'
import { CalendarDays, MessageCircle, Mail, Check, ArrowRight } from 'lucide-react'
import {
  WORKSHOP,
  WORKSHOP_CONTACT,
  workshopWeekends,
  workshopIncluded,
} from '@/lib/workshop-delhi-data'

/**
 * Date-first booking. Weekends are generated from the real calendar; selecting
 * one prefills the site's existing WhatsApp / email enquiry channels — no new
 * CRM or booking backend is invented.
 */
export default function WorkshopBooking() {
  const weekends = workshopWeekends()
  const [selected, setSelected] = useState<string | null>(weekends[0]?.id ?? null)
  const chosen = weekends.find((w) => w.id === selected)

  const enquiryText = chosen
    ? `Hi Astris Space — I'd like to request a seat for the Delhi Deep-Sky Astrophotography Workshop on ${chosen.label}. Please share the fee and details.`
    : `Hi Astris Space — I'd like details about the Delhi Deep-Sky Astrophotography Workshop.`
  const waHref = `https://wa.me/${WORKSHOP_CONTACT.whatsapp}?text=${encodeURIComponent(enquiryText)}`
  const mailHref = `mailto:${WORKSHOP_CONTACT.email}?subject=${encodeURIComponent(
    'Delhi Deep-Sky Astrophotography Workshop — Seat Request',
  )}&body=${encodeURIComponent(enquiryText)}`

  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" /> Reserve a seat
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Request a Weekend
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm font-light leading-relaxed text-white/60">
            Pick a weekend below and send us a request. {WORKSHOP.feeNote}
          </p>
        </div>

        {/* Date picker */}
        <div className="mt-10">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/55">
            <CalendarDays size={14} className="text-[var(--av-gold)]" /> Choose a weekend ·{' '}
            {WORKSHOP.monthsLabel}
          </p>
          {weekends.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/60">
              Dates for the next season are being finalised — send us a message and we’ll share the
              upcoming weekends.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {weekends.map((w) => {
                const active = w.id === selected
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelected(w.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-start gap-0.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                      active
                        ? 'border-[var(--av-gold)] bg-[var(--av-gold)]/10'
                        : 'border-white/12 bg-white/[0.03] hover:border-white/30'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                      {active && <Check size={13} className="text-[var(--av-gold)]" />}
                      {w.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-white/45">
                      {w.month} · Sat + Sun
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Summary + CTAs */}
        <div className="mt-8 rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/45">Selected weekend</p>
              <p className="font-display text-xl font-semibold text-white">
                {chosen ? chosen.label : 'None selected'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-white/45">Workshop fee</p>
              <p className="font-display text-xl font-semibold text-[var(--av-gold)]">
                {WORKSHOP.feeLabel}
              </p>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {workshopIncluded.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check size={15} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:brightness-110"
            >
              <MessageCircle size={16} />
              Request this weekend
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={mailHref}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              <Mail size={16} />
              Email instead
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-white/40">
            Seats are limited and confirmed on a first-come basis. Imaging is subject to weather and
            sky conditions.
          </p>
        </div>
      </div>
    </section>
  )
}
