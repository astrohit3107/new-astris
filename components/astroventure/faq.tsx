'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '@/lib/astroventure-data'
import SectionHeading from './section-heading'
import ScrollReveal from './scroll-reveal'
import { cn } from '@/lib/utils'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[var(--av-deep)] via-black to-[var(--av-deep)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <ScrollReveal key={i} delay={i * 60}>
                <div
                  className={cn(
                    'overflow-hidden rounded-2xl border transition-colors duration-300',
                    isOpen ? 'border-white/25 bg-white/[0.05]' : 'border-white/10 bg-white/[0.02]',
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-white">{f.question}</span>
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-transform duration-300',
                        isOpen && 'rotate-45 bg-[var(--av-gold)] text-black',
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-[400ms] ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm font-light leading-relaxed text-white/65">
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
