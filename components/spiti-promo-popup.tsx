'use client'

import { useEffect, useState } from 'react'
import { X, ArrowRight, Sparkles, CalendarDays, IndianRupee } from 'lucide-react'
import { SPITI, SPITI_IMAGES } from '@/lib/spiti-data'

const STORAGE_KEY = 'spiti26-promo-seen'

/**
 * First-visit, non-intrusive promo modal for Astroventure Spiti '26.
 * Shows once, then never again after dismissal (localStorage).
 */
export default function SpitiPromoPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let seen = false
    try {
      seen = localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      /* ignore */
    }
    if (seen) return
    const timer = setTimeout(() => setOpen(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
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
      aria-label="Astroventure Spiti '26 — early registrations open"
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
            src={SPITI_IMAGES.landscapeSecondary}
            alt="The Spiti Himalayas under a star-filled sky"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--av-deep)] via-black/40 to-transparent" />
        </div>

        <div className="p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--av-gold)]/30 bg-[var(--av-gold)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--av-gold)]">
            <Sparkles size={12} /> Early registrations open
          </span>
          <h3 className="font-display mt-4 text-2xl font-semibold leading-tight text-white">
            {SPITI.name}
          </h3>
          <p className="mt-1.5 text-sm italic text-white/60">{SPITI.tagline}</p>

          <div className="mt-4 space-y-1.5 text-sm text-white/75">
            <p className="flex items-center gap-2">
              <CalendarDays size={14} className="text-[var(--av-gold)]" />
              {SPITI.dateLabel} · {SPITI.durationLabel}
            </p>
            <p className="flex items-center gap-2">
              <IndianRupee size={14} className="text-[var(--av-gold)]" />
              from {SPITI.fromPriceLabel} · {SPITI.seatsLabel}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={SPITI.bookingPath}
              onClick={dismiss}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)]"
            >
              Book Expedition
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={SPITI.path}
              onClick={dismiss}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
