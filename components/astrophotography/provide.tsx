import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import AstroIcon from './icon'
import { astroProvide } from '@/lib/astrophotography-data'

export default function AstroProvide() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="av-divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Provide"
          title={<>Everything, handled for you</>}
          subtitle="So you can focus entirely on learning and shooting the night sky."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {astroProvide.map((p, i) => (
            <ScrollReveal key={p.value} delay={(i % 4) * 50} direction="scale">
              <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--av-gold)]/40 hover:bg-white/[0.06]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/20 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <AstroIcon name={p.icon} size={18} className="text-[var(--av-gold)]" />
                </span>
                <span className="text-sm font-medium leading-snug text-white/85">{p.value}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
