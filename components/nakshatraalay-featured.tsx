import Link from 'next/link'
import { ArrowRight, MapPin, Moon, Telescope } from 'lucide-react'

import { NAKSHATRAALAY, experiences, fromPrice, formatINR } from '@/lib/nakshatraalay-data'

/**
 * Homepage introduction to Nakshatraalay Gurgaon.
 *
 * Deliberately short: it says what the place is, what a night there costs,
 * and sends the reader to the destination. The detail lives on its own pages
 * rather than being duplicated here.
 */
export default function NakshatraalayFeatured() {
  const cheapest = experiences
    .map(fromPrice)
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => a.amount - b.amount)[0]

  const opens = NAKSHATRAALAY.opensAt
    ? new Date(NAKSHATRAALAY.opensAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      })
    : null

  return (
    <section id="nakshatraalay" className="relative scroll-mt-20 overflow-hidden bg-[#05060a] py-20 sm:py-28">
      {/* Photography, dimmed hard so the copy stays legible in both themes */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/nakshatraalay/hero-milkyway.jpg"
          alt=""
          loading="lazy"
          className="animate-slow-drift h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05060a] via-[#05060a]/85 to-[#05060a]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-transparent to-[#05060a]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
            {opens ? `Opening ${opens}` : 'Opening soon'}
          </span>

          <h2 className="font-display mt-5 text-balance text-4xl font-light leading-[1.05] text-white sm:text-5xl">
            Nakshatraalay Gurgaon
            <span className="mt-1 block text-white/50">Delhi NCR, look up.</span>
          </h2>

          <p className="mt-5 text-pretty text-base leading-relaxed text-white/65">
            Our first home under the stars — close enough for a Saturday, far enough that the sky
            comes back. Telescope nights, astrophotography workshops and a room to stay in
            afterwards.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {[
              { icon: MapPin, label: 'An hour or so from Delhi' },
              { icon: Telescope, label: 'Guided telescope nights' },
              { icon: Moon, label: 'Stay under the sky' },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/75"
              >
                <Icon size={13} className="text-[var(--av-gold)]" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/nakshatraalay/gurgaon"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)]"
            >
              Explore Nakshatraalay
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/sky-calendar"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              See the sky calendar
            </Link>
          </div>

          {cheapest && (
            <p className="mt-5 text-xs text-white/40">
              Nights from {formatINR(cheapest.amount)}{' '}
              {cheapest.perPerson ? 'per person' : 'total'}, stay and experience included.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
