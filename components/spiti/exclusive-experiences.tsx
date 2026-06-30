import { Sparkles } from 'lucide-react'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { spitiExclusiveExperiences, SPITI_IMAGES } from '@/lib/spiti-data'

export default function SpitiExclusiveExperiences() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Exclusive Experiences"
              title={<>Premium differentiators you won’t find elsewhere</>}
              subtitle="Every experience is led by professional astronomers with research-grade equipment."
            />

            <div className="mt-9 flex flex-wrap gap-2.5">
              {spitiExclusiveExperiences.map((exp, i) => (
                <ScrollReveal key={exp} delay={(i % 6) * 40} direction="scale">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition-colors hover:border-[var(--av-gold)]/40 hover:text-white">
                    <Sparkles size={13} className="text-[var(--av-gold)]" />
                    {exp}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal direction="right">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={SPITI_IMAGES.stargazingGroup}
                  alt="Participants stargazing through a telescope under a dark sky"
                  className="aspect-[3/4] w-full rounded-3xl border border-white/10 object-cover"
                  loading="lazy"
                />
                <img
                  src={SPITI_IMAGES.telescope}
                  alt="A telescope set up for an evening of deep-sky observation"
                  className="aspect-square w-full rounded-3xl border border-white/10 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={SPITI_IMAGES.astrophotography}
                  alt="Observing Saturn through the eyepiece of a telescope"
                  className="aspect-square w-full rounded-3xl border border-white/10 object-cover"
                  loading="lazy"
                />
                <img
                  src={SPITI_IMAGES.starTrails}
                  alt="Star trails wheeling above the mountains through the night"
                  className="aspect-[3/4] w-full rounded-3xl border border-white/10 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
