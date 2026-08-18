import { ArrowRight } from 'lucide-react'
import { ASTROED } from '@/lib/astroed-data'
import { ASTROTRAIN } from '@/lib/astrotrain-data'

/**
 * Homepage teasers for AstroEd and AstroTrain.
 *
 * Deliberately small: the homepage is a gateway. Each teaser states what the
 * offering is in one line and sends the visitor to its dedicated page — the
 * full programme detail lives on /astroed and /astrotrain, not here.
 */

const PROGRAMS = [
  {
    id: 'astroed',
    name: ASTROED.name,
    headline: ASTROED.positioning,
    teaser: ASTROED.teaser,
    href: ASTROED.path,
    cta: 'Explore AstroEd',
    image: ASTROED.image,
    imageAlt: ASTROED.imageAlt,
    audience: 'For schools',
  },
  {
    id: 'astrotrain',
    name: ASTROTRAIN.name,
    headline: 'Build Astronomy Into Your Property',
    teaser: ASTROTRAIN.teaser,
    href: ASTROTRAIN.path,
    cta: 'Explore AstroTrain',
    image: ASTROTRAIN.image,
    imageAlt: ASTROTRAIN.imageAlt,
    audience: 'For resorts & hotels',
  },
]

export default function ProgramTeasers() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="scroll-mt-20 border-t border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            <span className="h-px w-6 bg-accent/50" />
            Programmes
          </span>
          <h2
            id="programs-heading"
            className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.01em] text-foreground sm:text-4xl"
          >
            Astronomy, built into institutions
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2 md:gap-10">
          {PROGRAMS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              className="group flex flex-col border-t border-border pt-8 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                {p.name} · {p.audience}
              </p>
              <h3 className="mt-2.5 text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                {p.headline}
              </h3>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-foreground/60">
                {p.teaser}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                {p.cta}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
