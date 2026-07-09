'use client'

import { useState } from 'react'
import { Expand } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import Lightbox from './lightbox'
import { astroStudentGallery, type AstroGalleryImage } from '@/lib/astrophotography-data'

const spanCls: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function AstroStudentGallery() {
  const [selected, setSelected] = useState<AstroGalleryImage | null>(null)

  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="av-divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Student Gallery"
          title={<>Made on expedition</>}
          subtitle="A taste of the night sky you’ll learn to capture — click any frame to view it full-screen."
        />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 lg:grid-cols-4">
          {astroStudentGallery.map((img, i) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Expand size={14} />
                </span>
                {img.credit && (
                  <span className="absolute bottom-3 left-3 right-3 text-left text-[10px] font-medium text-white/60">
                    {img.credit}
                  </span>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Illustrative public-domain / Creative Commons imagery — to be replaced with photographs
          from future expeditions.
        </p>
      </div>

      <Lightbox image={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
