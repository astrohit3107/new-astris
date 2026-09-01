import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

/**
 * robots.txt — environment aware.
 *
 * Production (the canonical domain) is fully crawlable and points at the
 * production sitemap. Vercel PREVIEW deployments serve a blanket disallow so a
 * *.vercel.app build can never compete with production in search.
 *
 * VERCEL_ENV is 'production' | 'preview' | 'development'. It is only set on
 * Vercel, so local builds fall through to the crawlable branch harmlessly
 * (localhost isn't reachable by Googlebot anyway).
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === 'preview'

  if (isPreview) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing user-facing lives under /api — keep it out of the index.
        disallow: ['/api/'],
      },
    ],
    // The index plus each segment. Listing the segments as well as the index
    // is redundant for Googlebot but makes the set explicit for every other
    // crawler, and costs nothing.
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-pages.xml`,
      `${SITE_URL}/sitemap-experiences.xml`,
      `${SITE_URL}/sitemap-guides.xml`,
    ],
    host: SITE_URL,
  }
}
