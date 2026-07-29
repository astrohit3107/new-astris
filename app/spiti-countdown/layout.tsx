import type { Metadata, Viewport } from 'next'
import { Space_Mono, Playfair_Display } from 'next/font/google'
import { MISSION } from './mission.config'
import './spiti-countdown.css'

/**
 * Technical / UI monospace and the narrative serif for the Spiti Countdown
 * subpage. Loaded only on this route and exposed as CSS variables that
 * spiti-countdown.css reads via --mono / --serif.
 */
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-space-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const SITE_URL = 'https://astrisspace.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Astroventure Spiti Waitlist | Astris Space',
  description:
    'Request clearance for an exclusive astronomical observation mission into the dark skies of Spiti Valley. A time-sensitive Bortle Class 1 intercept window — not a vacation, a tactical ascent.',
  applicationName: 'Astroventure Spiti — Countdown',
  keywords: [
    'Spiti astronomy waitlist',
    'Spiti Valley stargazing',
    'Bortle Class 1 dark sky India',
    'astrophotography expedition Himalayas',
    'Astroventure Spiti countdown',
    'Astris Space',
  ],
  alternates: { canonical: MISSION.CANONICAL_PATH },
  openGraph: {
    type: 'website',
    title: 'Astroventure Spiti Waitlist | Astris Space',
    description:
      'Request clearance for an exclusive astronomical observation mission into the dark skies of Spiti Valley. The window is narrowing.',
    siteName: 'Astris Space // Astroventure',
    url: MISSION.CANONICAL_PATH,
    locale: 'en_IN',
    images: [{ url: '/spiti-countdown/og.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astroventure Spiti Waitlist | Astris Space',
    description:
      'Request clearance for an exclusive astronomical observation mission into the dark skies of Spiti Valley.',
    images: ['/spiti-countdown/og.svg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function SpitiCountdownLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`sc-root ${spaceMono.variable} ${playfair.variable}`}>
      {children}
    </div>
  )
}
