import { ArrowUpRight } from 'lucide-react'
import { homeExperiences } from '@/lib/astroventure-experiences'

/**
 * Homepage Astroventure line-up. Reads the single active-experience registry
 * (lib/astroventure-experiences) so the homepage always mirrors the nav
 * dropdown and the index — add an experience there and it appears here too.
 */
export default function AstroventureLineup() {
  return (
    <section id="more-astroventures" className="scroll-mt-20 border-t border-foreground/10 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--av-gold)]">
            <span className="h-px w-6 bg-[var(--av-gold)]/60" />
            Astroventure
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            More ways to chase a dark sky
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/60 sm:text-base">
            From our flagship Himalayan expedition to affordable Rajasthan weekend escapes and a
            hands-on deep-sky imaging workshop — pick the Astroventure that fits your night.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeExperiences.map((exp) => (
            <a
              key={exp.id}
              href={exp.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  {exp.category}
                </span>
                {exp.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-[var(--av-gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
                    {exp.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold leading-snug text-foreground">{exp.name}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground/55">{exp.blurb}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.meta.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 text-[10px] font-medium text-foreground/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-3">
                  <span className="text-xs font-semibold text-foreground">
                    {exp.priceLabel ?? 'View experience'}
                    {exp.priceLabel && <span className="font-normal text-foreground/45"> / person</span>}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 group-hover:border-[var(--av-gold)] group-hover:bg-[var(--av-gold)] group-hover:text-black">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
