'use client'

import { useEffect, useState } from 'react'

/**
 * Countdown to First Light.
 *
 * `opensAt` is null until the business commits to a date, and null is a
 * first-class state here rather than a bug: it renders "date to be announced"
 * instead of counting down to an invented moment. Announcing a fake opening
 * date to a waitlist is not a design detail — it is a promise the property
 * would then have to break.
 */
export default function FirstLightCountdown({ opensAt }: { opensAt: string | null }) {
  const target = opensAt ? new Date(opensAt).getTime() : null
  const valid = target !== null && !Number.isNaN(target)
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    if (!valid) return
    const tick = () => setRemaining((target as number) - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target, valid])

  if (!valid) {
    return (
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
          First Light
        </p>
        <p className="mt-3 text-2xl font-light text-white sm:text-3xl">Date to be announced</p>
        <p className="mt-2 text-sm text-white/50">The list hears first.</p>
      </div>
    )
  }

  if (remaining !== null && remaining <= 0) {
    return (
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
          First Light
        </p>
        <p className="mt-3 text-2xl font-light text-white sm:text-3xl">We&rsquo;re open.</p>
      </div>
    )
  }

  const s = Math.max(0, Math.floor((remaining ?? 0) / 1000))
  const parts = [
    { value: Math.floor(s / 86400), label: 'Days' },
    { value: Math.floor((s % 86400) / 3600), label: 'Hrs' },
    { value: Math.floor((s % 3600) / 60), label: 'Min' },
    { value: s % 60, label: 'Sec' },
  ]

  return (
    <div className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
        First Light in
      </p>
      <div
        className="mt-4 flex items-start justify-center gap-5 sm:gap-10"
        role="timer"
        aria-label="Time until Nakshatraalay Gurgaon opens"
      >
        {parts.map((p) => (
          <div key={p.label} className="min-w-[3.25rem]">
            <div className="font-display text-4xl font-light tabular-nums text-white sm:text-6xl">
              {remaining === null ? '––' : String(p.value).padStart(2, '0')}
            </div>
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-white/40">
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
