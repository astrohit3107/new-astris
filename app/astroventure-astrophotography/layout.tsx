import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import AstroNav from '@/components/astrophotography/nav'
import AstroFooter from '@/components/astrophotography/footer'
import { ASTRO } from '@/lib/astrophotography-data'
import { SITE_URL as CANONICAL_SITE_URL } from '@/lib/site-config'

/**
 * Premium display serif for headlines, exposed via the `--font-fraunces`
 * CSS variable which `--font-display` (globals.css) maps to.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

// Canonical production domain — see lib/site-config.ts
const SITE_URL = CANONICAL_SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    'Astroventure Astrophotography Expedition — Master the Night Sky in the Himalayas',
  description:
    'A 6-day immersive astrophotography expedition through Ladakh (Leh · Pangong · Hanle · Tso Moriri). Learn Milky Way photography, deep-space imaging, star trails, timelapse and a professional editing workflow under India’s darkest skies. Small-group mentoring for beginners & intermediate photographers. September & October new-moon batches.',
  applicationName: 'Astroventure Astrophotography Expedition',
  keywords: [
    'astrophotography expedition India',
    'Milky Way photography workshop',
    'Ladakh astrophotography tour',
    'Hanle dark sky photography',
    'deep sky imaging workshop',
    'star trail photography Himalayas',
    'timelapse photography workshop',
    'night sky photography course',
    'Astroventure',
    'Astris Space',
  ],
  alternates: { canonical: ASTRO.path },
  openGraph: {
    type: 'website',
    title: 'Astroventure Astrophotography Expedition — Master the Night Sky',
    description:
      'A 6-day immersive astrophotography masterclass through Ladakh under India’s darkest skies. Milky Way, deep-sky, star trails, timelapse and professional editing with a pro astrophotographer. Limited seats.',
    siteName: 'Astroventure Astrophotography Expedition',
    url: ASTRO.path,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astroventure Astrophotography Expedition — Master the Night Sky',
    description:
      'A 6-day astrophotography expedition through Ladakh. Milky Way, deep-sky, star trails, timelapse & pro editing. Limited seats.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05060f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function AstrophotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
