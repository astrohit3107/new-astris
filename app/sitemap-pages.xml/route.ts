import { pageEntries, urlsetXml, XML_RESPONSE_HEADERS } from '@/lib/seo/sitemap'

/** The existing commercial pages — the conversion layer. */
export const dynamic = 'force-static'

export function GET() {
  return new Response(urlsetXml(pageEntries()), { headers: XML_RESPONSE_HEADERS })
}
