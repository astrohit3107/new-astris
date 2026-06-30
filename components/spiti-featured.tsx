import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  IndianRupee,
  MapPin,
} from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import SpitiIcon from '@/components/spiti/icon'
import { SPITI, SPITI_IMAGES, spitiPillars } from '@/lib/spiti-data'

const keyHighlights = [
  'Premium stay & all meals included',
  'Luxury Tempo Traveller · Delhi transfers',
  'Large research-grade telescopes',
  'Milky Way & deep-space astrophotography',
  'Daily workshops with professional astronomers',
  'Curated expedition kit & completion certificate',
]

export default function SpitiFeatured() {
  return (
    <section
      id="astroventure"
      className="relative overflow-hidden border-y border-foreground/10 bg-gradient-to-b from-background via-[var(--av-deep)] to-background py-20 sm:py-24"
    >
      {/* Cosmic glows */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[var(--av-nebula)] opacity-15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[var(--av-aurora)] opacity-10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section eyebrow */}
        <ScrollReveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
            Featured Expedition
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
          </span>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Astroventure Spiti ’26
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground/65 sm:text-base">
            {SPITI.tagline} {SPITI.positioning}.
          </p>
        </ScrollReveal>

        {/* Alternating layout */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="group relative overflow-hidden rounded-3xl border border-foreground/10">
              <img
                src={SPITI_IMAGES.landscapePrimary}
                alt="The Spiti Himalayas beneath a star-filled sky"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <CalendarDays size={12} className="text-[var(--av-gold)]" /> {SPITI.dateLabelShort}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Clock size={12} className="text-[var(--av-gold)]" /> {SPITI.durationLabel}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={80}>
            <p className="text-pretty text-base font-light leading-relaxed text-foreground/75">
              An eight-day high-altitude road expedition from Delhi into the Spiti Valley — combining
              astronomy, astrophotography and Himalayan exploration under some of India’s darkest
              skies.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {keyHighlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check size={15} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Price + CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-baseline gap-1.5">
                <IndianRupee size={18} className="text-[var(--av-gold)]" />
                <span className="text-3xl font-black text-foreground">{SPITI.fromPriceLabel.replace('₹', '')}</span>
                <span className="text-xs text-foreground/55">onwards · per person</span>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--av-gold)]/40 bg-[var(--av-gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--av-gold)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-gold)] animate-pulse-glow" /> {SPITI.seatsLabel}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={SPITI.bookingPath}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-bold text-background transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--av-gold)] hover:text-black"
              >
                Book Now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={SPITI.path}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/25 px-6 py-3 text-sm font-bold text-foreground transition-all duration-300 hover:bg-foreground/5"
              >
                View Expedition
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero feature card — the seven pillars */}
        <ScrollReveal className="mt-14" direction="up">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50">
              What the expedition includes
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {spitiPillars.map((p) => (
                <div
                  key={p.title}
                  className="group flex flex-col items-center gap-2.5 rounded-2xl border border-foreground/10 bg-background/40 p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20 transition-colors group-hover:bg-[var(--av-gold)]/20">
                    <SpitiIcon name={p.icon} size={20} className="text-[var(--av-gold)]" />
                  </span>
                  <span className="text-xs font-medium leading-snug text-foreground/85">{p.title}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Expedition calendar row */}
        <ScrollReveal className="mt-14" direction="up">
          <div className="mb-5 flex items-center gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/55">
              Expedition Calendar
            </h3>
            <span className="h-px flex-1 bg-foreground/10" />
          </div>
          <a
            href={SPITI.bookingPath}
            className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 transition-all duration-300 hover:border-[var(--av-gold)]/40 hover:bg-foreground/[0.06] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--av-gold)]">Sep</span>
                <span className="text-lg font-black leading-none text-foreground">20</span>
              </div>
              <div>
                <p className="font-bold text-foreground">{SPITI.name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/60">
                  <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {SPITI.dateLabel}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={12} /> Spiti Valley, Himachal</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-[72px] sm:pl-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {SPITI.statusLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                Book Now
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
