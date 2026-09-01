import Link from 'next/link'
import { ArrowUpRight, Clock, Users, Moon, Camera, Heart, Telescope } from 'lucide-react'

import {
  type NakshatraalayExperience,
  EXPERIENCE_KIND_LABEL,
  fromPrice,
  formatINR,
} from '@/lib/nakshatraalay-data'

/**
 * The experience card.
 *
 * Motion is CSS-only and hangs off `group-hover` / `data-reveal`, so the card
 * stays a server component — no client JS ships for a card that only needs to
 * lift and glow. The gradient wash and the drifting starfield are pure
 * decoration and are marked aria-hidden.
 */

const KIND_ICON = {
  public_event: Telescope,
  workshop: Camera,
  private: Heart,
  family: Users,
} as const

/** Each kind gets its own accent so the grid reads at a glance. */
const KIND_ACCENT = {
  public_event: 'from-sky-400/20 via-transparent',
  workshop: 'from-violet-400/20 via-transparent',
  private: 'from-rose-400/20 via-transparent',
  family: 'from-amber-400/20 via-transparent',
} as const

export default function ExperienceCard({
  experience: exp,
  featured = false,
}: {
  experience: NakshatraalayExperience
  featured?: boolean
}) {
  const Icon = KIND_ICON[exp.kind] ?? Telescope
  const cheapest = fromPrice(exp)

  return (
    <Link
      href={`/experiences/${exp.slug}`}
      data-reveal
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.055] hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--av-gold)] sm:p-7 ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      {/* Accent wash — brightens on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${KIND_ACCENT[exp.kind]} to-transparent opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100`}
      />
      {/* Hairline that draws itself across the top on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[var(--av-gold)]/70 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-[var(--av-gold)] transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--av-gold)]/40 group-hover:bg-[var(--av-gold)]/10">
          <Icon size={19} />
        </span>
        <span className="rounded-full border border-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          {EXPERIENCE_KIND_LABEL[exp.kind]}
        </span>
      </div>

      <h3
        className={`font-display relative mt-5 font-semibold leading-tight text-white ${
          featured ? 'text-2xl sm:text-3xl' : 'text-xl'
        }`}
      >
        {exp.title}
      </h3>
      <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-white/55">{exp.summary}</p>

      {/* Meta */}
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65">
          <Clock size={11} className="text-[var(--av-gold)]" />
          {exp.durationLabel}
        </span>
        {exp.groupSizeLabel && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/65">
            <Users size={11} className="text-[var(--av-gold)]" />
            {exp.groupSizeLabel}
          </span>
        )}
      </div>

      {/* Price + affordance */}
      <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
        <div>
          {cheapest ? (
            <>
              <p className="text-[10px] uppercase tracking-wider text-white/40">
                {exp.priceTiers.length > 1 ? 'From' : 'Price'}
              </p>
              <p className="font-display mt-0.5 text-xl font-light text-white">
                {formatINR(cheapest.amount)}
                <span className="ml-1 text-xs font-normal text-white/45">
                  {cheapest.perPerson ? 'per person' : 'total'}
                </span>
              </p>
            </>
          ) : (
            <p className="text-sm text-white/50">On enquiry</p>
          )}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-[var(--av-gold)] group-hover:bg-[var(--av-gold)] group-hover:text-black">
          <ArrowUpRight size={17} className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  )
}
