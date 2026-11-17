'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Moon, X } from 'lucide-react'

// Changing the key re-shows the bar to people who dismissed the old one.
const STORAGE_KEY = 'announcement-sambhar-saturdays'

/**
 * Site-wide announcement. Points at what is actually bookable: Sambhar Lake,
 * every Saturday. (It used to announce Nakshatraalay's 15 September opening,
 * which has passed, and the venue is now moving.)
 */
export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setHidden(true)
    } catch {
      /* storage blocked — just show it */
    }
  }, [])

  if (hidden) return null

  return (
    <div className="relative z-[60] bg-[var(--av-deep)] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--av-nebula)]/25 via-transparent to-[var(--av-aurora)]/20" />
      <a
        href="/astroventure-nights/sambhar-lake"
        className="group relative flex items-center justify-center gap-2 px-9 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs"
      >
        <Moon size={13} className="shrink-0 text-[var(--av-gold)]" />
        <span className="truncate">
          <span className="font-semibold text-[var(--av-gold)]">Stargazing every Saturday</span>
          <span className="text-white/85"> at Sambhar Lake</span>
          <span className="hidden text-white/55 sm:inline"> · dinner, a night’s stay and breakfast</span>
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-white">
          Book a Saturday
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
