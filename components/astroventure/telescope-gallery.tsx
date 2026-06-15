'use client'

import { Aperture } from 'lucide-react'
import { telescopeEquipment, celestialTargets, IMAGES } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'

export default function TelescopeGallery() {
  return (
    <section
      id="telescopes"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--av-aurora)] opacity-10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The instruments"
          title="Premium Optics, Pristine Skies"
          subtitle="We carry research-grade telescopes and tracking mounts into the mountains so you can see the cosmos in breathtaking detail."
        />

        {/* Feature image + equipment list */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal direction="left">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={IMAGES.telescopeHero}
                alt="A premium telescope set up under the night sky"
                loading="lazy"
                className="h-[420px] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 sm:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-transparent to-transparent" />
              <div className="glass absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl p-4">
                <Aperture className="text-[var(--av-gold)]" size={22} />
                <p className="text-sm text-white/85">
                  Guided, hands-on observation — no experience required.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {telescopeEquipment.map((eq, i) => (
              <ScrollReveal key={eq.name} direction="right" delay={i * 110}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06]">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={eq.image}
                      alt={eq.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">{eq.name}</h3>
                    <p className="font-mono text-xs text-[var(--av-gold)]">{eq.spec}</p>
                    <p className="mt-1 text-sm text-white/55">{eq.capability}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Sample celestial targets */}
        <ScrollReveal className="mt-16">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
            Sample observation targets
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {celestialTargets.map((t, i) => (
              <ScrollReveal
                key={t.name}
                delay={i * 70}
                direction="scale"
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-500 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06]"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--av-gold)] transition-transform duration-500 group-hover:scale-110">
                  <span className="animate-orbit block h-1.5 w-1.5 rounded-full bg-[var(--av-gold)]" />
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/50">{t.type}</p>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
