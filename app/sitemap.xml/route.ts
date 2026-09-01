import { sitemapIndexXml, SITEMAP_SEGMENTS, XML_RESPONSE_HEADERS } from '@/lib/seo/sitemap'

/**
 * /sitemap.xml — a sitemap INDEX.
 *
 * This replaces the previous single urlset (app/sitemap.ts). The submitted
 * URL in Search Console does not change: Google reads the index and fetches
 * the three segments beneath it, which is what makes per-segment indexing
 * coverage visible rather than aggregated into one number.
 */
export const dynamic = 'force-static'

export function GET() {
  return new Response(sitemapIndexXml([...SITEMAP_SEGMENTS]), { headers: XML_RESPONSE_HEADERS })
}
