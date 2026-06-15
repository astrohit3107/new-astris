'use client'

import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { galleryImages, galleryCategories } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

export default function PhotoGallery() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = galleryImages.filter((g) => filter === 'All' || g.category === filter)

  const close = useCallback(() => setLightbox(null), [])
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  )
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length],
  )

  // Keyboard controls + scroll lock while lightbox is open
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, next, prev])

  const current = lightbox === null ? null : filtered[lightbox]

  return (
    <section
      id="gallery"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Moments under the stars"
          title="Through the Lens"
          subtitle="Glimpses from past expeditions — the telescopes, the skies and the people who looked up with us."
        />

        {/* Category filter */}
        <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-2.5">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                filter === cat
                  ? 'border-[var(--av-gold)] bg-[var(--av-gold)] text-black'
                  : 'border-white/15 bg-white/[0.03] text-white/65 hover:border-white/40 hover:text-white',
              )}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Masonry */}
        <div className="mt-10 [column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <ScrollReveal
              key={`${img.src}-${i}`}
              delay={(i % 3) * 80}
              className="mb-4 break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={cn(
                    'w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110',
                    img.span === 'tall' ? 'h-[28rem]' : img.span === 'wide' ? 'h-56' : 'h-72',
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">{img.category}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                    <ZoomIn size={16} />
                  </span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous image"
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={24} />
          </button>

          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.alt}
              className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {current.alt}
              <span className="mx-2 text-white/30">·</span>
              <span className="text-white/50">
                {lightbox! + 1} / {filtered.length}
              </span>
            </figcaption>
          </figure>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next image"
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  )
}
