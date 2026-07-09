'use client'

import { useState } from 'react'
import { Expand } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import Lightbox from './lightbox'
import {
  astroPortfolio,
  astroPortfolioCategories,
  ASTRO_TRAINER,
  type AstroGalleryImage,
} from '@/lib/astrophotography-data'

const spanCls: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function AstroPortfolio() {
  const [active, setActive] = useState<string>('All')
  const [selected, setSelected] = useState<AstroGalleryImage | null>(null)
  const images =
    active === 'All' ? astroPortfolio : astroPortfolio.filter((g) => g.category === active)

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trainer Portfolio"
          title={<>The work behind the mentorship</>}
          subtitle="Milky Way, deep sky, nebulae, galaxies and star trails — click any frame to view it full-screen."
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
              key={img.src + i}
              delay={(i % 4) * 50}
              direction="scale"
              className={cn(spanCls[img.span ?? 'normal'])}
            >
              <button
                type="button"
                onClick={() => setSelected(img)}
                aria-label={`View ${img.alt} full-screen`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Expand affordance */}
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={14} />
                </span>
                {/* Category + credit */}
                <span className="absolute bottom-3 left-3 right-3 flex flex-col items-start gap-0.5 text-left">
                  <span className="text-xs font-semibold text-white">{img.category}</span>
                  {img.credit && (
                    <span className="text-[10px] font-medium text-white/55">{img.credit}</span>
                  )}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Flagship Milky Way, nebula and star-trail photographs © {ASTRO_TRAINER.name}. Galaxy frames
          are public-domain / CC reference images pending the trainer’s own galaxy work.
        </p>
      </div>

      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
