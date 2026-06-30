import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import Starfield from '@/components/astroventure/starfield'
import { spitiNights, SPITI_IMAGES } from '@/lib/spiti-data'

export default function SpitiAstronomyNights() {
  return (
    <section
      id="nights"
      className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28"
    >
      {/* Faint Milky Way wash + stars */}
      <div className="absolute inset-0 opacity-30">
        <img
          src={SPITI_IMAGES.milkyWayArch}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[var(--av-deep)]/80" />
      </div>
      <Starfield count={50} shootingStars={false} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Astronomy Experiences"
          title={<>Six themed nights under the cosmos</>}
          subtitle="Not generic stargazing — a curated arc of the universe, one night at a time."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spitiNights.map((n, i) => (
            <ScrollReveal key={n.night} delay={(i % 3) * 70} direction="up">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06]">
                <span className="font-display text-6xl font-semibold text-white/10 transition-colors duration-500 group-hover:text-[var(--av-gold)]/25">
                  {String(n.night).padStart(2, '0')}
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--av-gold)]">
                  Night {n.night}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold leading-tight text-white">
                  {n.theme}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                  {n.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
