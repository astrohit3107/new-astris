import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import AstroIcon from './icon'
import { astroWhy } from '@/lib/astrophotography-data'

export default function AstroWhy() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="av-divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why This Expedition"
          title={<>A workshop unlike any other</>}
          subtitle="Eight reasons this is a premium expedition, not a standard photography tour."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {astroWhy.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 4) * 60} direction="up">
              <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--av-gold)]/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/25 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <AstroIcon name={f.icon} size={22} className="text-[var(--av-gold)]" />
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold leading-snug text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
                  {f.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
