import type { Metadata } from 'next'
import { SITE } from '@/lib/astroventure-data'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Astris SpaceEd collects, uses and protects your information.',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-white/45">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 space-y-6 text-sm font-light leading-relaxed text-white/70">
        <p>
          This is a placeholder privacy policy for Astroventure Nights by {SITE.brand}. Replace this
          content with your finalised policy before going live.
        </p>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Information we collect</h2>
          <p className="mt-2">
            When you submit the registration form we collect the details you provide — your name,
            phone number, email address, age, city, number of participants, preferred destination
            and date, and any notes — solely to respond to your enquiry and arrange your experience.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">How we use it</h2>
          <p className="mt-2">
            Your information is used to contact you about your booking, confirm availability, and
            share trip details. We do not sell your data to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Contact</h2>
          <p className="mt-2">
            For any privacy questions, email{' '}
            <a href={`mailto:${SITE.email}`} className="text-[var(--av-gold)] hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </section>
      </div>

      <a href="/astroventure-nights" className="mt-10 inline-block text-sm text-[var(--av-gold)] hover:underline">
        ← Back to Astroventure Nights
      </a>
    </main>
  )
}
