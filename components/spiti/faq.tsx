'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { spitiFaqs } from '@/lib/spiti-data'

export default function SpitiFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Everything you need to know</>}
          subtitle="Fitness, altitude, cameras, weather, food and more."
        />

        <div className="mt-12 space-y-3">
          {spitiFaqs.map((f, i) => {
            const isOpen = open === i
            return (
              <ScrollReveal key={f.question} delay={(i % 5) * 40}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="text-sm font-medium text-white sm:text-base">{f.question}</span>
                    <Plus
                      size={18}
                      className={cn(
                        'shrink-0 text-[var(--av-gold)] transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm font-light leading-relaxed text-white/65 sm:px-6">
                        {f.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
