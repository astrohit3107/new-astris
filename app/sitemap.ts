import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { activeDestinations } from '@/lib/astroventure-data'

/**
 * XML sitemap — canonical production URLs only.
 *
 * Every entry is built from SITE_URL, so a *.vercel.app deployment can never
 * publish a competing sitemap of preview URLs. Archived destinations are
 * excluded (their pages stay reachable, but we don't ask Google to index them).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/astroed', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/astrotrain', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/nakshatraalay/gurgaon', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/first-light', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/astroventure-nights', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/astroventure-spiti-26', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/astroventure-astrophotography', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/delhi-deep-sky-astrophotography-workshop', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/spiti-countdown', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/astroventure-nights/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/astroventure-nights/terms', priority: 0.2, changeFrequency: 'yearly' },
  ]

  const destinationRoutes = activeDestinations.map((d) => ({
    path: `/astroventure-nights/${d.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticRoutes, ...destinationRoutes].map((r) => ({
    url: `${SITE_URL}${r.path === '/' ? '/' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
