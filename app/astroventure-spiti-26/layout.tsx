import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import SpitiNav from '@/components/spiti/nav'
import SpitiFooter from '@/components/spiti/footer'
import { SPITI } from '@/lib/spiti-data'

/**
 * Premium display serif for headlines, exposed via the `--font-fraunces`
 * CSS variable which `--font-display` (globals.css) maps to.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

const SITE_URL = 'https://astrisspace.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Astroventure Spiti ’26 — India’s Premier High-Altitude Astronomy Expedition',
  description:
    'Astroventure Spiti ’26: an 8-day, 7-night premium high-altitude astronomy expedition through the Himalayas (20–28 September 2026). Dark skies, large telescopes, astrophotography, Milky Way photography and a curated expedition kit. Limited seats.',
  applicationName: 'Astroventure Spiti ’26',
  keywords: [
    'Spiti astronomy expedition',
    'Spiti Valley stargazing',
    'high altitude astronomy India',
    'Milky Way photography Spiti',
    'astrophotography tour Himalayas',
    'dark sky expedition India',
    'Astroventure Spiti 2026',
    'Astris Space',
  ],
  alternates: { canonical: SPITI.path },
  openGraph: {
    type: 'website',
    title: 'Astroventure Spiti ’26 — Where the Himalayas Meet the Milky Way',
    description:
      'An 8-day high-altitude astronomy expedition through Spiti, 20–28 September 2026. Premium stay, large telescopes, astrophotography and India’s darkest skies.',
    siteName: 'Astroventure Spiti ’26',
    url: SPITI.path,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astroventure Spiti ’26 — Where the Himalayas Meet the Milky Way',
    description:
      'An 8-day high-altitude astronomy expedition through Spiti, 20–28 September 2026. Limited seats.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05060f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function SpitiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} dark min-h-screen scroll-smooth bg-[var(--av-deep)] text-white antialiased`}
    >
      <SpitiNav />
      {children}
      <SpitiFooter />
    </div>
  )
}
