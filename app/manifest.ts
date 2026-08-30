import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site-config'

/**
 * Web app manifest. The `name` here is one of the signals Google uses to
 * determine the site name shown in search results, so it must match the
 * WebSite schema and og:site_name exactly.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
