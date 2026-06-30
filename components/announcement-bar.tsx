'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Rocket, X } from 'lucide-react'
import { SPITI } from '@/lib/spiti-data'

const STORAGE_KEY = 'spiti26-announcement-dismissed'

/**
 * Slim, premium announcement bar that runs across the top of the site.
 * The whole bar links to the Spiti '26 expedition; a subtle close hides it
 * for the rest of the browser session.
 */
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
        href={SPITI.bookingPath}
        className="group relative flex items-center justify-center gap-2 px-9 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs"
      >
        <Rocket size={13} className="shrink-0 text-[var(--av-gold)]" />
        <span className="truncate">
          <span className="font-semibold text-[var(--av-gold)]">{SPITI.name}</span>
          <span className="text-white/85"> registrations are now live</span>
          <span className="hidden text-white/55 sm:inline"> · {SPITI.seatsLabel} · {SPITI.dateLabelShort}</span>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white">
          Book Now
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
