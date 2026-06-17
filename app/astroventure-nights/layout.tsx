import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import AstroNav from '@/components/astroventure/nav'
import AstroFooter from '@/components/astroventure/footer'
import { SITE } from '@/lib/astroventure-data'

/**
 * Premium display serif for headlines. Loaded only on the Astroventure
 * Nights pages and exposed via the `--font-fraunces` CSS variable, which
 * `--font-display` (in globals.css) maps to. For true italic cuts you may
 * add `style: ['normal', 'italic']`.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

// TODO: set this to your production domain so OG/canonical URLs resolve absolutely.
const SITE_URL = 'https://astrisspace.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Astroventure Nights — Himalayan Dark-Sky Astronomy Expeditions',
    template: '%s · Astroventure Nights',
  },
  description:
    'Experience the Himalayas through the lens of astronomy. Explore pristine dark skies, observe celestial wonders through powerful telescopes, and create unforgettable memories under the stars with Astris SpaceEd.',
  applicationName: 'Astroventure Nights',
  keywords: [
    'astronomy expedition India',
    'Himalayan stargazing',
    'dark sky tourism',
    'astrophotography tour',
    'Soldung Valley stargazing',
    'Chitkul dark sky',
    'Kasol astronomy',
    'telescope observation',
    'Milky Way Himalayas',
    'Astris SpaceEd',
  ],
  authors: [{ name: SITE.brand }],
  creator: SITE.brand,
  alternates: { canonical: '/astroventure-nights' },
  openGraph: {
    type: 'website',
    title: 'Astroventure Nights — Himalayan Dark-Sky Astronomy Expeditions',
    description:
      'Pristine dark skies, research-grade telescopes and expert astronomers across the Indian Himalayas. Reserve your night under the stars.',
    siteName: 'Astroventure Nights',
    url: '/astroventure-nights',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astroventure Nights — Himalayan Dark-Sky Astronomy Expeditions',
    description:
      'Pristine dark skies, research-grade telescopes and expert astronomers across the Indian Himalayas.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05060f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function AstroventureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} dark min-h-screen scroll-smooth bg-[var(--av-deep)] text-white antialiased`}
    >
      <AstroNav />
      {children}
      <AstroFooter />
    </div>
  )
}
