'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Rocket, X } from 'lucide-react'
import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'

// Keyed to the launch so a new announcement is not suppressed by an old dismissal.
const STORAGE_KEY = `nakshatraalay-announcement-${NAKSHATRAALAY.opensAt ?? 'tba'}`

/**
 * Slim, premium announcement bar that runs across the top of the site.
 * The whole bar links to the current launch — Nakshatraalay First Light — and
 * a subtle close hides it for the rest of the browser session.
 */
const OPENS_LABEL = NAKSHATRAALAY.opensAt
  ? new Date(NAKSHATRAALAY.opensAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Asia/Kolkata',
    })
  : 'soon'

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY) === '1') setHidden(true)
  }, [])

  if (hidden) return null

  return (
    <div className="relative z-[60] bg-[var(--av-deep)] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--av-nebula)]/25 via-transparent to-[var(--av-aurora)]/20" />
      <a
        href="/first-light"
        className="group relative flex items-center justify-center gap-2 px-9 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs"
      >
        <Rocket size={13} className="shrink-0 text-[var(--av-gold)]" />
        <span className="truncate">
          <span className="font-semibold text-[var(--av-gold)]">Nakshatraalay First Light</span>
          <span className="text-white/85"> — Delhi NCR&rsquo;s home under the stars</span>
          <span className="hidden text-white/55 sm:inline"> · opening {OPENS_LABEL}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white">
          Join the list
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </a>
      <button
        onClick={() => {
          setHidden(true)
          try {
            sessionStorage.setItem(STORAGE_KEY, '1')
          } catch {
            /* ignore */
          }
        }}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  )
}
