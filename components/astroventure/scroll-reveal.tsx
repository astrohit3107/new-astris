'use client'

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  /** stagger delay in ms */
  delay?: number
  as?: ElementType
  /** direction of entry */
  direction?: 'up' | 'left' | 'right' | 'scale' | 'none'
  once?: boolean
}

/**
 * Lightweight intersection-observer reveal wrapper used across the
 * Astroventure Nights pages for smooth, performant scroll animations.
 */
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  direction = 'up',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const hidden: Record<string, string> = {
    up: 'opacity-0 translate-y-10',
    left: 'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10',
    scale: 'opacity-0 scale-95',
    none: 'opacity-0',
  }

  return (
    <Tag
      ref={ref as never}
      className={cn(
        'transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hidden[direction],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
