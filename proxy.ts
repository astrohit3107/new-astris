import { NextResponse, type NextRequest } from 'next/server'

/**
 * ============================================================================
 *  CANONICAL HOST ENFORCEMENT (Next.js proxy)
 * ============================================================================
 *  Google had indexed the project's *.vercel.app deployment URL as a competing
 *  copy of the site. This middleware makes the canonical domain the only
 *  indexable host, while keeping the preview workflow usable:
 *
 *   • PRODUCTION deployment reached over its *.vercel.app alias
 *       -> 308 permanent redirect to the same path on the canonical domain,
 *          preserving pathname and query string. Google follows this and
 *          consolidates the deployment URL into the real domain.
 *
 *   • PREVIEW deployments (VERCEL_ENV === 'preview')
 *       -> served normally so branch previews still work, but tagged
 *          `X-Robots-Tag: noindex, nofollow` so they can never be indexed.
 *          (robots.ts additionally serves a blanket Disallow for previews.)
 *
 *   • Local development and the canonical domain itself
 *       -> untouched.
 * ========================================================================== */

const CANONICAL_HOST = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.astriseducation.in')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const isVercelHost = host.endsWith('.vercel.app')
  const vercelEnv = process.env.VERCEL_ENV

  // Preview builds stay reachable but must never be indexed.
  if (vercelEnv === 'preview') {
    const res = NextResponse.next()
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return res
  }

  // The production deployment reached over its *.vercel.app alias: send both
  // users and crawlers to the canonical domain.
  if (isVercelHost && vercelEnv === 'production') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = CANONICAL_HOST
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Skip Next internals and static assets — only real page/route requests
  // need canonical-host handling.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|txt|xml|webmanifest)$).*)'],
}
