import React from "react"
import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE, SITE_URL, absoluteUrl } from '@/lib/site-config'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const TITLE = "Astris Space - India's Leading Astronomy & Space Education Ecosystem"
const DESCRIPTION =
  'Bring the universe closer through experiential astronomy. Astris Space offers AstroTrain for resorts, AstroEd for schools, and Nakshatra Scopes telescopes across India.'

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image paths and canonicals to absolute URLs
  // against the canonical production domain (never a *.vercel.app host).
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE.name,
  // Tells Google the brand name for this site, alongside the WebSite schema.
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    locale: SITE.locale,
    images: [{ url: SITE.ogImage, width: 512, height: 512, alt: `${SITE.name} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

/**
 * Site-identity structured data. The WebSite `name` is the primary signal
 * Google uses for the site name shown in search results — without it Google
 * falls back to guessing from the host (which is how "Vercel" appeared).
 */
function SiteIdentitySchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE.name,
        alternateName: [SITE.shortName],
        description: SITE.description,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE.name,
        alternateName: [SITE.shortName],
        url: `${SITE_URL}/`,
        description: SITE.description,
        email: 'astriseducation@gmail.com',
        telephone: '+91 75818 21834',
        address: { '@type': 'PostalAddress', addressCountry: 'IN' },
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: absoluteUrl(SITE.logo),
          contentUrl: absoluteUrl(SITE.logo),
          caption: SITE.name,
        },
        image: { '@id': `${SITE_URL}/#logo` },
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: next-themes writes the theme class onto <html>
    // before React hydrates — that inline write is what prevents a flash of the
    // wrong theme on first paint.
    <html lang="en" suppressHydrationWarning>
      <head>
        <SiteIdentitySchema />
        {/* Scroll-reveal blocks ship hidden and are revealed by an observer.
            Without JS that would leave the page blank — so force them visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
