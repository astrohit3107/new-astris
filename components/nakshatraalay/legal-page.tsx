import type { ReactNode } from 'react'
import Link from 'next/link'

import NakshatraalayNav from '@/components/nakshatraalay/nav'
import { NAKSHATRAALAY } from '@/lib/nakshatraalay-data'
import { POLICY_UPDATED } from '@/lib/policies'

/** Shared chrome for the three policy pages, so they read as one document. */
export default function LegalPage({
  title,
  standfirst,
  children,
}: {
  title: string
  standfirst: string
  children: ReactNode
}) {
  return (
    <main className="dark min-h-screen bg-[#05060a] text-white">
      <NakshatraalayNav backHref="/nakshatraalay/gurgaon" backLabel="Nakshatraalay" />

      <section className="border-b border-white/10 px-5 pb-12 pt-36 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
            {NAKSHATRAALAY.name}
          </p>
          <h1 className="font-display mt-5 text-balance text-4xl font-light leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-white/65">{standfirst}</p>
          <p className="mt-6 text-xs text-white/40">
            Last updated{' '}
            {new Date(POLICY_UPDATED).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-10">{children}</div>
      </section>

      <section className="border-t border-white/10 px-5 py-12 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-x-6 gap-y-2 text-xs text-white/45">
          <span className="text-white/60">Other policies:</span>
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/cancellation">
            Cancellation &amp; refunds
          </Link>
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/rescheduling">
            Rescheduling
          </Link>
          <Link className="underline hover:text-white" href="/nakshatraalay/gurgaon/privacy">
            Privacy
          </Link>
        </div>
      </section>
    </main>
  )
}

/** A titled block of policy prose. */
export function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-light text-white sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/65">{children}</div>
    </div>
  )
}
