import { Check, Camera, Info } from 'lucide-react'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroRecommendedGear, ASTRO_RENTAL, ASTRO_IMAGES } from '@/lib/astrophotography-data'

export default function AstroEquipment() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy + gear list */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Equipment"
              title={<>Bring your own — or rent from us</>}
              subtitle="Participants may bring their own gear. Here’s what we recommend for the field."
            />

            <ul className="mt-9 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {astroRecommendedGear.map((g) => (
                <ScrollReveal as="li" key={g.item} direction="up">
                  <div className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                    <span>
                      {g.item}
                      {g.optional && (
                        <span className="ml-1.5 text-xs italic text-white/40">(optional)</span>
                      )}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </ul>

            {/* Rental callout */}
            <ScrollReveal direction="up" delay={80}>
              <div className="mt-8 rounded-2xl border border-[var(--av-gold)]/25 bg-[var(--av-gold)]/[0.06] p-5">
                <div className="flex items-center gap-2">
                  <Camera size={18} className="text-[var(--av-gold)]" />
                  <p className="font-display text-lg font-semibold text-white">Equipment Rental</p>
                  <span className="ml-auto rounded-full bg-[var(--av-gold)]/15 px-3 py-1 text-xs font-semibold text-[var(--av-gold)]">
                    {ASTRO_RENTAL.priceLabel}
                  </span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm font-light leading-relaxed text-white/65">
                  <Info size={15} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
                  {ASTRO_RENTAL.note}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={ASTRO_IMAGES.astrophotographySetup}
                alt="A camera on a heavy-duty tripod set up for astrophotography under the night sky"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-transparent to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
