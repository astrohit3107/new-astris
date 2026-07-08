'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroPortfolio, astroPortfolioCategories, ASTRO_TRAINER } from '@/lib/astrophotography-data'

const spanCls: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function AstroPortfolio() {
  const [active, setActive] = useState<string>('All')
  const images =
    active === 'All' ? astroPortfolio : astroPortfolio.filter((g) => g.category === active)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trainer Portfolio"
          title={<>The work behind the mentorship</>}
          subtitle="Milky Way, deep sky, nebulae, galaxies, star trails, landscapes, timelapse and night portraits."
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {astroPortfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300',
                active === cat
                  ? 'border-[var(--av-gold)] bg-[var(--av-gold)] text-black'
                  : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/40 hover:text-white',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <ScrollReveal
              key={img.src + i + img.category}
              delay={(i % 4) * 50}
              direction="scale"
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]',
                spanCls[img.span ?? 'normal'],
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/90">
                {img.category}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Placeholder imagery — replace all images with the portfolio of {ASTRO_TRAINER.name}.
        </p>
      </div>
    </section>
  )
}
