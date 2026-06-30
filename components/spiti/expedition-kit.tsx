import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import SpitiIcon from './icon'
import { spitiKit } from '@/lib/spiti-data'

export default function SpitiExpeditionKit() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      {/* Cosmic glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-[var(--av-nebula)] opacity-15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Expedition Kit · Included"
          title={<>A premium memory package, not merchandise</>}
          subtitle="Every participant returns home with a beautifully curated Astroventure Expedition Kit."
        />

        <div className="mt-14 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {spitiKit.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i % 4) * 60} direction="up">
              <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--av-gold)]/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--av-gold)]/10 ring-1 ring-[var(--av-gold)]/25 transition-colors group-hover:bg-[var(--av-gold)]/20">
                  <SpitiIcon name={item.icon} size={22} className="text-[var(--av-gold)]" />
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
