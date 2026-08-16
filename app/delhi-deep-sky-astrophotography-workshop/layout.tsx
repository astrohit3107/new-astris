import type { Metadata, Viewport } from 'next'
import { Fraunces } from 'next/font/google'
import WorkshopNav from '@/components/workshop-delhi/nav'
import WorkshopFooter from '@/components/workshop-delhi/footer'
import { WORKSHOP } from '@/lib/workshop-delhi-data'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

const SITE_URL = 'https://astrisspace.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    'Deep-Sky Astrophotography Workshop in Delhi — Narrowband & DSO Imaging | Astris Space',
  description:
    'A hands-on weekend workshop on photographing nebulae and deep-sky objects from heavily light-polluted Delhi using narrowband imaging (Hα · OIII · SII). Learn the full workflow — acquisition, calibration, stacking and processing — with a live imaging session. September & October 2026.',
  applicationName: WORKSHOP.name,
  keywords: [
    'astrophotography workshop Delhi',
    'astrophotography workshop Delhi NCR',
    'deep sky astrophotography workshop',
    'astrophotography course Delhi',
    'narrowband astrophotography workshop',
    'deep sky imaging workshop',
    'astrophotography from Delhi',
    'DSO astrophotography workshop',
    'astronomy photography workshop',
    'Astris Space',
  ],
  alternates: { canonical: WORKSHOP.path },
  openGraph: {
    type: 'website',
    title: 'Deep-Sky Astrophotography from Delhi — Narrowband & DSO Imaging Workshop',
    description:
      'Photograph nebulae and deep-sky objects from a light-polluted city using narrowband imaging. A two-night, hands-on weekend workshop with a live acquisition session. Sep & Oct 2026.',
    siteName: 'Astris Space',
    url: WORKSHOP.path,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep-Sky Astrophotography from Delhi — Narrowband Workshop',
    description:
      'Learn to photograph the deep sky from a light-polluted city with narrowband imaging. Hands-on weekend workshop, Sep & Oct 2026.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#05060f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} dark min-h-screen scroll-smooth bg-[var(--av-deep)] text-white antialiased`}
    >
      <WorkshopNav />
      {children}
      <WorkshopFooter />
    </div>
  )
}
