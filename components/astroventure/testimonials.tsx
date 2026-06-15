'use client'

import { useCallback, useEffect, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [paused, count])

  return (
    <section
      className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--av-nebula)] opacity-10 blur-[130px]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Voices from the dark" title="Stories Under the Stars" />

        <ScrollReveal className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <figure key={i} className="w-full shrink-0 px-1">
                  <div className="glass rounded-3xl p-8 text-center sm:p-10">
                    <Quote className="mx-auto text-[var(--av-gold)]" size={32} />
                    <div className="mt-4 flex justify-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} size={15} className="fill-[var(--av-gold)] text-[var(--av-gold)]" />
                      ))}
                    </div>
                    <blockquote className="font-display mt-5 text-balance text-xl font-light italic leading-relaxed text-white sm:text-2xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center justify-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-white/50">{t.role}</p>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-[var(--av-gold)]' : 'w-2 bg-white/25 hover:bg-white/40',
                  )}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
