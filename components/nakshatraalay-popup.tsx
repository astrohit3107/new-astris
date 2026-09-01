'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'

import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'

/**
 * First Light announcement.
 *
 * Shows once and then never again for that visitor. Dismissal is remembered in
 * localStorage, and the opening date is part of the key so that when the next
 * launch is announced everyone sees it rather than being permanently opted out
 * by a click they made months earlier.
 *
 * It also stops appearing once the opening has passed — an announcement of an
 * event that already happened is just clutter.
 */
export default function NakshatraalayPopup() {
  const [open, setOpen] = useState(false)

  const opensAt = NAKSHATRAALAY.opensAt ? new Date(NAKSHATRAALAY.opensAt) : null
  const storageKey = `nakshatraalay-first-light-${NAKSHATRAALAY.opensAt ?? 'tba'}`

  useEffect(() => {
    if (opensAt && opensAt.getTime() < Date.now()) return

    let seen = false
    try {
      seen = localStorage.getItem(storageKey) === '1'
    } catch {
      // Private mode or storage disabled — show it, but do not crash.
    }
    if (seen) return

    const timer = setTimeout(() => setOpen(true), 3200)
    return () => clearTimeout(timer)
  }, [storageKey]) // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    setOpen(false)
    try {
      localStorage.setItem(storageKey, '1')
    } catch {
      /* nothing to do */
    }
  }

  // Close on Escape, like any other dialog.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null

  const opensLabel = opensAt
    ? opensAt.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      })
    : null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nk-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close announcement"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />

      <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-[#0a0c14] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition hover:bg-black/70 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="relative h-40 overflow-hidden sm:h-48">
          <img
            src="/nakshatraalay/hero-milkyway.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/30 to-transparent" />
        </div>

        <div className="p-6 pt-2 sm:p-7 sm:pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]">
            Nakshatraalay First Light
          </p>
          <h2 id="nk-popup-title" className="font-display mt-2.5 text-2xl font-semibold text-white">
            Delhi NCR, look up.
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-white/60">
            Our first home under the stars opens{opensLabel ? ` on ${opensLabel}` : ' soon'} — telescope
            nights, astrophotography and a room to stay in afterwards.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/first-light"
              onClick={dismiss}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--av-gold)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Join the list
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/nakshatraalay/gurgaon"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/5"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
