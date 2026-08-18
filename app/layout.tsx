import React from "react"
import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image paths and canonicals to absolute URLs.
  metadataBase: new URL('https://www.astriseducation.in'),
  title: 'Astris Space - India\'s Leading Astronomy & Space Education Ecosystem',
  description: 'Bring the universe closer through experiential astronomy. Astris Space offers AstroTrain for resorts, AstroEd for schools, and Nakshatra Scopes telescopes across India.',
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
