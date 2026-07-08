import { ArrowRight, Users } from 'lucide-react'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { ASTRO, ASTRO_TRAINER } from '@/lib/astrophotography-data'

export default function AstroLimitedSeats() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--av-gold)]/25 bg-gradient-to-br from-[var(--av-gold)]/[0.10] via-white/[0.03] to-[var(--av-nebula)]/[0.10] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-[var(--av-gold)] opacity-10 blur-[90px]" />

            <span className="relative inline-flex items-center gap-2 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--av-gold)]">
              <Users size={13} /> {ASTRO.seatsLabel}
            </span>

            <h2 className="font-display relative mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Small Batch. Personalized Mentorship.
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-pretty text-base font-light leading-relaxed text-white/70">
              To ensure every participant receives one-on-one guidance from {ASTRO_TRAINER.name},
              each expedition is limited to a small group. Bookings are confirmed only upon advance
              payment, and equipment rentals are allocated on a first-come, first-served basis.
            </p>

            <a
              href={ASTRO.bookingPath}
              className="group relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--av-gold)] hover:shadow-[0_14px_44px_-10px_var(--av-gold)]"
            >
              Reserve My Seat
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
