import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import AstroIcon from './icon'
import { astroAudience } from '@/lib/astrophotography-data'

export default function AstroAudience() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who Should Join"
          title={<>Built for anyone drawn to the night</>}
          subtitle="Whether you shoot professionally or are picking up a camera for the first time."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {astroAudience.map((a, i) => (
            <ScrollReveal key={a.value} delay={(i % 3) * 60} direction="up">
              <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <AstroIcon name={a.icon} size={19} className="text-[var(--av-gold)]" />
                </span>
                <span className="text-sm font-medium leading-snug text-white/85 sm:text-base">
                  {a.value}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
