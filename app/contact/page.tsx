import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import LegalPage, { Clause } from '@/components/nakshatraalay/legal-page'
import {
  CONTACT, LEGAL_ENTITY, REGISTERED_OFFICE, REGISTERED_OFFICE_LINE, SITE_URL,
  telHref, whatsappHref,
} from '@/lib/site-config'

const TITLE = 'Contact Astris Space'
const DESCRIPTION =
  'Phone, WhatsApp, email and registered office address for Astris Space (ASTRIS SPACEED LLP), New Delhi.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/contact` },
}

const row = 'flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5'
const link = 'underline decoration-white/30 underline-offset-2 hover:text-white'

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#page`,
    url: `${SITE_URL}/contact`,
    name: TITLE,
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Astris Space',
      legalName: LEGAL_ENTITY,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: { '@type': 'PostalAddress', ...REGISTERED_OFFICE },
    },
  }

  return (
    <LegalPage
      title="Contact us"
      standfirst="The quickest way to reach us is WhatsApp. Every channel below reaches the same team."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid gap-3 sm:grid-cols-2">
        <a href={whatsappHref('Hello Astris Space — ')} target="_blank" rel="noopener noreferrer" className={`${row} transition hover:border-white/25`}>
          <MessageCircle size={18} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
          <span>
            <span className="block text-sm font-semibold text-white">WhatsApp</span>
            <span className="text-sm text-white/60">{CONTACT.phone}</span>
          </span>
        </a>
        <a href={telHref} className={`${row} transition hover:border-white/25`}>
          <Phone size={18} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
          <span>
            <span className="block text-sm font-semibold text-white">Phone</span>
            <span className="text-sm text-white/60">{CONTACT.phone}</span>
          </span>
        </a>
        <a href={`mailto:${CONTACT.email}`} className={`${row} transition hover:border-white/25`}>
          <Mail size={18} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
          <span>
            <span className="block text-sm font-semibold text-white">Email</span>
            <span className="text-sm text-white/60">{CONTACT.email}</span>
          </span>
        </a>
        <div className={row}>
          <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--av-gold)]" />
          <span>
            <span className="block text-sm font-semibold text-white">Registered office</span>
            <span className="text-sm leading-relaxed text-white/60">{REGISTERED_OFFICE_LINE}</span>
          </span>
        </div>
      </div>

      <Clause heading="What can we help with?">
        <ul className="space-y-1.5">
          <li>
            — <span className="text-white/85">A night of stargazing</span>:{' '}
            <Link className={link} href="/astroventure-nights/sambhar-lake">Sambhar Lake, every Saturday</Link>.
          </li>
          <li>
            — <span className="text-white/85">Schools</span>:{' '}
            <Link className={link} href="/astroed">AstroEd space labs and curriculum</Link>.
          </li>
          <li>
            — <span className="text-white/85">Hotels and resorts</span>:{' '}
            <Link className={link} href="/astrotrain">AstroTrain astronomy experiences</Link>.
          </li>
          <li>
            — <span className="text-white/85">An existing booking</span>: quote your payment ID so we can
            find it straight away.
          </li>
        </ul>
      </Clause>

      <Clause heading="The company">
        <p>
          Astris Space is a trading name of {LEGAL_ENTITY}, registered office {REGISTERED_OFFICE_LINE}.
          The registered office is our company address — it is not a venue, and experiences do not take
          place there.
        </p>
      </Clause>
    </LegalPage>
  )
}
