import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'
import { bestNights } from '@/lib/sky-calendar'
import SkyCalendarInteractive from '@/components/nakshatraalay/sky-calendar-interactive'
import Reveal from '@/components/nakshatraalay/reveal'
import { MoonGlyph } from '@/components/nakshatraalay/celestial-icons'

const PATH = '/sky-calendar'
const TITLE = 'Sky Calendar — The Best Nights to Look Up near Delhi'
const DESCRIPTION =
  'See what is in the sky over Nakshatraalay Gurgaon on any night — moon phase and illumination, which planets are up, and which deep-sky objects are well placed. Pick the night, then come and look.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    'stargazing near Delhi',
    'best nights for stargazing Delhi NCR',
    'moon phase calendar India',
    'what planets are visible tonight Delhi',
  ],
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: PATH, siteName: 'Astris Space' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

function formatShort(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

export default function SkyCalendarPage() {
  const best = bestNights(4)

  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      {/* ---------------------------------------------------- hero ---- */}
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-6 sm:pb-20">
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="/nakshatraalay/hero-milkyway.jpg"
            alt=""
            className="animate-slow-drift h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/55 via-[#05060a]/80 to-[#05060a]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
            {NAKSHATRAALAY.name}
          </p>
          <h1 className="font-display animate-fade-up mt-5 text-balance text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            The best nights
            <span className="block text-white/45">to look up</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/65" style={{ animationDelay: '160ms' }}>
            Don&rsquo;t just pick a date — pick a sky. Hover any night to see the Moon, the planets
            that are up, and the deep-sky objects worth pointing a telescope at.
          </p>
        </div>
      </section>

      {/* ----------------------------------------- best nights -------- */}
      {best.length > 0 && (
        <section className="px-5 pb-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
                <Sparkles size={13} /> Darkest nights ahead
              </h2>
            </Reveal>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {best.map((night, i) => (
                <Reveal key={night.date} delay={i * 90}>
                  <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.03] p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06]">
                    <MoonGlyph illumination={night.moon.illumination} waxing={night.moon.waxing} size={38} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{formatShort(night.date)}</p>
                      <p className="text-xs text-emerald-300/80">
                        {night.band} · {Math.round(night.moon.illumination * 100)}% moon
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------- calendar --------- */}
      <section className="px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SkyCalendarInteractive />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ close ------- */}
      <section className="relative overflow-hidden border-t border-white/10 px-5 py-20 text-center sm:px-6 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0">
          <img src="/nakshatraalay/telescope-night.jpg" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#05060a]/80 to-[#05060a]" />
        </div>
        <Reveal className="relative mx-auto max-w-xl">
          <h2 className="font-display text-balance text-3xl font-light sm:text-4xl">
            Found a night worth the drive?
          </h2>
          <Link
            href="/experiences"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[var(--av-gold)]"
          >
            See the experiences
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
