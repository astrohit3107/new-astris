import type { Metadata } from 'next'
import { SITE } from '@/lib/astroventure-data'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for Astroventure Nights experiences by Astris SpaceEd.',
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Terms &amp; Conditions</h1>
      <p className="mt-3 text-sm text-white/45">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-sm font-light leading-relaxed text-white/70">
        <p>
          This is a placeholder terms &amp; conditions document for Astroventure Nights by{' '}
          {SITE.brand}. Replace this content with your finalised terms before going live.
        </p>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Bookings &amp; payment</h2>
          <p className="mt-2">
            A reservation is confirmed once payment is received and acknowledged by our team. Seats
            are limited and allocated on a first-come, first-served basis.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Weather &amp; cancellations</h2>
          <p className="mt-2">
            Astronomy experiences are weather-dependent. In the event of unfavourable conditions we
            will adapt the programme and, where possible, offer alternative dates. Please refer to
            our cancellation and refund policy shared at the time of booking.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Safety</h2>
          <p className="mt-2">
            Participants travel to high-altitude locations and agree to follow guidance from our
            team at all times. Please disclose any medical conditions in advance.
          </p>
        </section>
      </div>

      <a href="/astroventure-nights" className="mt-10 inline-block text-sm text-[var(--av-gold)] hover:underline">
        ← Back to Astroventure Nights
      </a>
    </main>
  )
}
