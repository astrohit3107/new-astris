import { CalendarDays, Clock, Mountain, Moon } from 'lucide-react'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { SPITI, SPITI_OVERVIEW, SPITI_IMAGES } from '@/lib/spiti-data'

const stats = [
  { icon: Clock, value: SPITI.durationLabel, label: 'Expedition length' },
  { icon: CalendarDays, value: SPITI.dateLabelShort, label: 'Departure window' },
  { icon: Mountain, value: '4,000 m+', label: 'High-altitude Spiti' },
  { icon: Moon, value: 'Dark Sky', label: 'Among India’s darkest' },
]

export default function SpitiOverview() {
  return (
    <section id="overview" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expedition Overview"
          title={<>A scientific journey through the Spiti Himalayas</>}
          subtitle="National Geographic meets a luxury expedition — astronomy first, adventure throughout."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                src={SPITI_IMAGES.landscapePrimary}
                alt="A high Himalayan village in Spiti beneath a star-filled sky"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={80}>
            <p className="text-pretty text-lg font-light leading-relaxed text-white/75">
              {SPITI_OVERVIEW}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="glass rounded-2xl border border-white/10 p-5"
                  >
                    <Icon size={20} className="text-[var(--av-gold)]" />
                    <p className="font-display mt-3 text-xl font-semibold text-white">{s.value}</p>
                    <p className="mt-0.5 text-xs text-white/55">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
