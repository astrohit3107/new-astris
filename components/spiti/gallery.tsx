'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { spitiGallery, spitiGalleryCategories } from '@/lib/spiti-data'

const spanCls: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function SpitiGallery() {
  const [active, setActive] = useState<string>('All')
  const images = active === 'All' ? spitiGallery : spitiGallery.filter((g) => g.category === active)

  return (
    <section id="gallery" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title={<>Scenes from the expedition</>}
          subtitle="Milky Way, telescopes, Spiti landscapes, participants and the night."
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {spitiGalleryCategories.map((cat) => (
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
              className={cn('group relative overflow-hidden rounded-2xl border border-white/10', spanCls[img.span ?? 'normal'])}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.category}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Placeholder imagery — to be replaced with photography from Astroventure Spiti ’26.
        </p>
      </div>
    </section>
  )
}
