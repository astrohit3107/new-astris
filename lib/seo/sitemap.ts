/**
 * ============================================================================
 *  SITEMAP SOURCES + XML BUILDER
 * ============================================================================
 *  The sitemap is segmented so the commercial layer and the SEO layer can be
 *  monitored separately in Search Console. That separation is the whole point:
 *  "are the guides being indexed?" becomes a question you can answer from the
 *  Sitemaps report instead of inferring it from a single mixed list.
 *
 *    /sitemap.xml              → index, references the three below
 *    /sitemap-pages.xml        → the existing commercial pages
 *    /sitemap-experiences.xml  → destinations and experience detail pages
 *    /sitemap-guides.xml       → the SEO acquisition layer
 *
 *  RULES enforced here: canonical origin only (never a *.vercel.app host),
 *  no archived destinations, no /api routes, no redirect targets, and no
 *  noindex URLs. Everything listed returns 200 and is self-canonical.
 * ========================================================================== */

import { SITE_URL } from '@/lib/site-config'
import { activeDestinations } from '@/lib/astroventure-data'
import { experiences as nakshatraalayExperiences } from '@/lib/nakshatraalay-data'
import { guides } from '@/lib/seo/registry'

export interface SitemapEntry {
  path: string
  lastModified: string
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
}

/** Build-time stamp for pages whose content has no explicit review date. */
const BUILT = new Date().toISOString()

/* ------------------------------------------------------------ commercial */
export function pageEntries(): SitemapEntry[] {
  return [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/astroed', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/astrotrain', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/nakshatraalay/gurgaon', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/first-light', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/experiences', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/sky-calendar', priority: 0.8, changeFrequency: 'daily' },
    { path: '/groups', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/schools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/astroventure-nights', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/astroventure-astrophotography', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/delhi-deep-sky-astrophotography-workshop', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/astroventure-nights/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/astroventure-nights/terms', priority: 0.2, changeFrequency: 'yearly' },
  ].map((e) => ({ ...e, lastModified: BUILT }) as SitemapEntry)
}

/* ----------------------------------------------------------- experiences */
export function experienceEntries(): SitemapEntry[] {
  return [
    // Archived destinations stay reachable but are never submitted for indexing.
    ...activeDestinations.map((d) => ({
      path: `/astroventure-nights/${d.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    })),
    ...nakshatraalayExperiences.map((e) => ({
      path: `/experiences/${e.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ].map((e) => ({ ...e, lastModified: BUILT }) as SitemapEntry)
}

/* ---------------------------------------------------------------- guides */
export function guideEntries(): SitemapEntry[] {
  return guides.map((g) => ({
    path: `/${g.slug}`,
    // Hubs carry slightly more weight than their supporting pages.
    priority: g.isHub ? 0.8 : 0.7,
    changeFrequency: 'monthly' as const,
    // The guide's own review date, not the build date — so a rebuild that
    // changed nothing does not claim every guide was updated.
    lastModified: new Date(g.updated).toISOString(),
  }))
}

/* ------------------------------------------------------------------- XML */

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>'

/** A <urlset> document. */
export function urlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${e.path}</loc>\n` +
        `    <lastmod>${e.lastModified}</lastmod>\n` +
        `    <changefreq>${e.changeFrequency}</changefreq>\n` +
        `    <priority>${e.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join('\n')

  return `${XML_HEADER}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** A <sitemapindex> document. */
export function sitemapIndexXml(paths: string[]): string {
  const items = paths
    .map(
      (p) =>
        `  <sitemap>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${BUILT}</lastmod>\n  </sitemap>`,
    )
    .join('\n')

  return `${XML_HEADER}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`
}

export const XML_RESPONSE_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
} as const

/** The three segment sitemaps referenced by the index. */
export const SITEMAP_SEGMENTS = [
  '/sitemap-pages.xml',
  '/sitemap-experiences.xml',
  '/sitemap-guides.xml',
] as const
