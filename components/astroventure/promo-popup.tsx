'use client'

import { useEffect, useState } from 'react'
import { X, ArrowRight, Sparkles, CalendarDays } from 'lucide-react'
import { IMAGES } from '@/lib/astroventure-data'

const STORAGE_KEY = 'av-chitkul-promo-dismissed'

export default function PromoPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    const timer = setTimeout(() => setOpen(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Chitkul Dark-Sky Week"
      onClick={dismiss}
    >
      <div
        className="glass-strong relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <X size={18} />
        </button>

        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={IMAGES.chitkul}
            alt="Chitkul under a star-filled sky"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-black/40 to-transparent" />
        </div>

        <div className="p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--av-gold)]">
            <Sparkles size={12} /> New departure
          </span>
          <h3 className="font-display mt-4 text-2xl font-semibold leading-tight text-white">
            Chitkul Dark-Sky Week
          </h3>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-white/70">
            <CalendarDays size={14} className="text-[var(--av-gold)]" />
            25 June – 2 July 2026
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
            Bookings are now open for a full week under India’s darkest skies in
            Chitkul. Limited seats — reserve your spot before they fill up.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a
              href="/astroventure-nights/chitkul#book"
              onClick={dismiss}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)]"
            >
              Book Chitkul
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/astroventure-nights/chitkul"
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Chitkul
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
