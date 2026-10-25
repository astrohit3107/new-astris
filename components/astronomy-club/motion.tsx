'use client'

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type AnchorHTMLAttributes,
} from 'react'
import { track } from '@vercel/analytics'

/**
 * Motion primitives for /astronomy-club.
 *
 * No animation library: pinning is CSS `position: sticky` (so the browser
 * owns scrolling and nothing is ever scroll-jacked), and the only JavaScript
 * is a passive scroll listener that turns an element's position into a 0–1
 * progress value. Listeners only run while their scene is near the viewport.
 *
 * With prefers-reduced-motion every hook reports its final state at once.
 */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

/**
 * Calls `onProgress` with a 0–1 value as the element scrolls.
 *
 *  - `pin`: 0 when the element's top reaches the viewport top, 1 when its
 *    bottom reaches the viewport bottom. Use on a tall track with a sticky stage.
 *  - `through`: 0 when the top is at `start` of the viewport height, 1 when it
 *    is at `end`. Use for scrubbing a normal-height scene.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  { mode = 'through', start = 0.9, end = 0.25 }: { mode?: 'pin' | 'through'; start?: number; end?: number } = {},
) {
  const cb = useRef(onProgress)
  cb.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      cb.current(1)
      return
    }

    let frame = 0
    let active = false
    const measure = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p =
        mode === 'pin'
          ? clamp01(-r.top / Math.max(1, r.height - vh))
          : clamp01((vh * start - r.top) / Math.max(1, vh * (start - end)))
      cb.current(p)
    }
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(measure)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        active = e.isIntersecting
        if (active) measure()
      },
      { rootMargin: '25% 0px 25% 0px' },
    )
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, mode, start, end])
}

/** True once the element has entered the viewport (and stays true). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

const FROM: Record<string, string> = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: '-translate-x-10',
  right: 'translate-x-10',
  none: '',
}

/** Fade (and optionally slide) in once, when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  as?: 'div' | 'li' | 'p'
}) {
  const [ref, shown] = useInView<HTMLDivElement>(0.15)
  return (
    <Tag
      // data-reveal: the <noscript> rule in app/layout.tsx forces this visible.
      ref={ref as RefObject<never>}
      data-reveal=""
      data-in={shown ? '' : undefined}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : `${FROM[from]} opacity-0`
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

/**
 * A number that rolls up when it scrolls into view. Screen readers and the
 * server-rendered HTML always get the final value.
 */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  pad = 0,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  pad?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4)
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!inView) {
      setN(0)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / duration)
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const shown = n ?? value
  const text = `${prefix}${pad ? String(shown).padStart(pad, '0') : shown}${suffix}`
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {text}
      </span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  )
}

/* ---------------------------------------------------------------- analytics */

export type ClubEvent =
  | 'club_cta_demo_click'
  | 'club_cta_quote_click'
  | 'club_form_submit'
  | 'club_pdf_download'
  | 'club_whatsapp_click'
  | 'club_chapter_view'
  | 'club_share_click'

/** Vercel Analytics custom event. Never lets analytics break the page. */
export function clubTrack(name: ClubEvent, props?: Record<string, string | number | boolean>) {
  try {
    track(name, props)
  } catch {
    /* analytics is best-effort */
  }
}

/** An <a> that records an analytics event when clicked. */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: ClubEvent
  eventProps?: Record<string, string | number | boolean>
}) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        clubTrack(event, eventProps)
        onClick?.(e)
      }}
    />
  )
}

/** The `pin:` CSS variant's condition: desktop width and motion allowed. */
export const PIN_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

/**
 * Whether pinned, scrubbed layouts are in use. False during SSR and on first
 * render, so the default is always the complete, static final state.
 */
export function usePinMode(): boolean {
  const [pin, setPin] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY)
    const on = () => setPin(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return pin
}
