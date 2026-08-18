'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Shared editorial primitives for the /astroed and /astrotrain pages.
 * Deliberately restrained: hairline rules, generous space, quiet motion —
 * the AstroVenture design language translated to a light-capable theme.
 */

/** Slow fade-and-rise on scroll. Honours prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    // data-reveal lets the <noscript> rule in app/layout.tsx force this content
    // visible when JavaScript never runs — otherwise the server HTML (opacity-0)
    // would leave the page blank.
    <div
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/** Small uppercase label with a hairline lead-in. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
      <span className="h-px w-6 bg-accent/50" />
      {children}
    </span>
  )
}

/** Section heading block: eyebrow + title + optional lede. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
}) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.01em] text-foreground sm:text-4xl">
        {title}
      </Tag>
      {lede && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/60">{lede}</p>
      )}
    </div>
  )
}

/** Full-width hairline divider matching the editorial rhythm. */
export function Rule({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-border ${className}`} />
}

/**
 * Primary / secondary CTA pair. Links (not buttons) because every one of these
 * navigates — to WhatsApp, mail, or another route.
 */
export function CtaPair({
  primary,
  secondary,
  align = 'left',
}: {
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
  align?: 'left' | 'center'
}) {
  const ext = (e?: boolean) =>
    e ? { target: '_blank', rel: 'noopener noreferrer' as const } : {}
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row ${
        align === 'center' ? 'sm:justify-center' : ''
      }`}
    >
      <a
        href={primary.href}
        {...ext(primary.external)}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {primary.label}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </a>
      {secondary && (
        <a
          href={secondary.href}
          {...ext(secondary.external)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground/45 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {secondary.label}
        </a>
      )}
    </div>
  )
}
