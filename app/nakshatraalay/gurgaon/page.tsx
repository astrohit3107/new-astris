import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Moon, Users } from 'lucide-react'

import { SITE_URL } from '@/lib/site-config'
import {
  NAKSHATRAALAY,
  experiences,
  stayTypes,
  packages,
  formatINR,
  EXPERIENCE_KIND_LABEL,
  bookHref,
  groupHref,
} from '@/lib/nakshatraalay-data'
import { moonPhase } from '@/lib/moon-phase'

/**
 * Nakshatraalay Gurgaon — the destination page.
 *
 * The page is honest about its own state: while the property is `announced`
 * rather than `open`, the primary action is the First Light list, and every
 * booking action opens WhatsApp with context rather than a checkout that does
 * not exist yet.
 */

const PATH = '/nakshatraalay/gurgaon'
const TITLE = 'Nakshatraalay Gurgaon — Stargazing & Astronomy Stays near Delhi'
const DESCRIPTION =
  'Delhi NCR’s gateway to the universe. Telescope nights, astrophotography workshops and stays under the stars, an easy drive from Gurgaon and Delhi.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    'stargazing near Gurgaon',
    'stargazing near Delhi',
    'astronomy experience Delhi NCR',
    'astrophotography workshop Delhi',
    'telescope experience Delhi NCR',
    'weekend getaway near Delhi',
    'astronomy stay near Delhi',
  ],
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: 'Astris Space',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

/** Recomputed on each request so the Moon is current, not build-time. */
export const dynamic = 'force-dynamic'

export default function NakshatraalayGurgaonPage() {
  const isOpen = NAKSHATRAALAY.status === 'open'
  const moon = moonPhase()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        name: NAKSHATRAALAY.name,
        description: DESCRIPTION,
        url: `${SITE_URL}${PATH}`,
        touristType: 'Astronomy enthusiasts, families, photographers',
        address: {
          '@type': 'PostalAddress',
          addressLocality: NAKSHATRAALAY.city,
          addressRegion: 'Haryana',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Astris Space', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: NAKSHATRAALAY.name, item: `${SITE_URL}${PATH}` },
        ],
      },
    ],
  }

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero ----------------------------------------------------------- */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden px-5 pb-16 pt-28 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_0%,#171f36_0%,#080a12_55%,#05060a_100%)]"
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
            {NAKSHATRAALAY.brand} · {NAKSHATRAALAY.region}
          </p>
          <h1 className="font-display mt-5 text-balance text-5xl font-light leading-[1.03] tracking-tight sm:text-7xl">
            Leave the city.
            <span className="block text-white/55">Look into the universe.</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/65">
            {NAKSHATRAALAY.intro}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/experiences"
              className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-[var(--av-gold)]"
            >
              Explore experiences
            </Link>
            {isOpen ? (
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold transition hover:border-white/50"
              >
                <MessageCircle size={16} /> Book your night
              </a>
            ) : (
              <Link
                href="/first-light"
                className="rounded-full border border-white/25 px-7 py-3.5 text-center text-sm font-semibold transition hover:border-white/50"
              >
                Join the First Light list
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Tonight -------------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-light sm:text-3xl">
              The Moon tonight
            </h2>
            <p className="text-xs text-white/40">Calculated for tonight</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/45">
                <Moon size={13} className="text-[var(--av-gold)]" /> Phase
              </span>
              <p className="font-display mt-2 text-2xl font-light">{moon.name}</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <span className="text-[11px] uppercase tracking-wider text-white/45">Illuminated</span>
              <p className="font-display mt-2 text-2xl font-light">
                {Math.round(moon.illumination * 100)}%
              </p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
              <span className="text-[11px] uppercase tracking-wider text-white/45">Best for</span>
              <p className="font-display mt-2 text-2xl font-light">
                {moon.illumination < 0.35 ? 'Deep sky' : 'The Moon itself'}
              </p>
            </div>
          </div>

          <Link
            href="/sky-calendar"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--av-gold)] hover:underline"
          >
            See the best nights to come <ArrowRight size={14} />
          </Link>

          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-white/35">
            Moon phase is calculated, not forecast. What you actually see on the night also depends
            on cloud and haze — astronomy never comes with a guarantee, and we won&rsquo;t pretend
            otherwise.
          </p>
        </div>
      </section>

      {/* Experiences ---------------------------------------------------- */}
      <section id="experiences" className="scroll-mt-16 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-light sm:text-4xl">The experience</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
            Nights built around what the sky is actually doing — not a fixed script.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp) => (
              <article
                key={exp.slug}
                className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition hover:border-white/25"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                    {EXPERIENCE_KIND_LABEL[exp.kind]}
                  </span>
                  {exp.sample && (
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-amber-200/80">
                      Sample
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-3 text-lg font-semibold">{exp.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{exp.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-xs text-white/40">
                    {exp.durationLabel} ·{' '}
                    {exp.fromPriceLabel ? `from ${exp.fromPriceLabel}` : 'on enquiry'}
                  </span>
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--av-gold)] hover:underline"
                  >
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stay ----------------------------------------------------------- */}
      <section id="stays" className="scroll-mt-16 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Stay under the stars</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {stayTypes.map((stay) => (
              <div key={stay.name} className="rounded-2xl border border-white/12 bg-white/[0.03] p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{stay.name}</h3>
                  <span className="text-xs text-white/45">{stay.countLabel}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{stay.description}</p>
              </div>
            ))}
          </div>
          {/* Packages — room + the complete experience, per night */}
          <div className="mt-12">
            <h3 className="font-display text-xl font-semibold">What a night costs</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
              Each package is a stay <em>with</em> the complete astronomy experience included —
              not a room with the night sold separately. Prices are per night.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl border border-white/12 bg-white/[0.03] p-6"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-display text-lg font-semibold">{pkg.name}</h4>
                    <span className="text-xs text-white/45">{pkg.occupancyLabel}</span>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-wider text-white/45">Weekday</dt>
                      <dd className="font-display mt-1 text-xl font-light">
                        {formatINR(pkg.weekdayPrice)}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.07] px-4 py-3">
                      <dt className="text-[10px] uppercase tracking-wider text-white/45">Weekend</dt>
                      <dd className="font-display mt-1 text-xl font-light text-[var(--av-gold)]">
                        {formatINR(pkg.weekendPrice)}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-5 space-y-2">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-white/60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--av-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/35">
              Weekend rates apply to Friday and Saturday nights. Availability is confirmed by
              message — we don&rsquo;t show live seat counts.
            </p>
          </div>
        </div>
      </section>

      {/* Groups --------------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.05] p-8 sm:p-10">
            <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--av-gold)]">
              <Users size={14} /> Groups, colleges & schools
            </span>
            <h2 className="font-display mt-4 text-balance text-2xl font-light sm:text-3xl">
              Bring your class, team or society under the stars.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
              Dedicated group nights for schools, colleges, astronomy and photography societies, and
              company teams — with the telescopes and the guiding built around your group.
            </p>
            <a
              href={groupHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--av-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              <MessageCircle size={16} /> Plan a group experience
            </a>
          </div>
        </div>
      </section>

      {/* Close ---------------------------------------------------------- */}
      <section className="border-t border-white/10 px-5 py-24 text-center sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-balance text-3xl font-light sm:text-4xl">
            {NAKSHATRAALAY.tagline}
          </h2>
          {isOpen ? (
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)]"
            >
              <MessageCircle size={16} /> Book your night
            </a>
          ) : (
            <Link
              href="/first-light"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)]"
            >
              Join the First Light list
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
