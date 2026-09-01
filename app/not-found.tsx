import Link from 'next/link'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Eyebrow } from '@/components/program/ui'
import { clusters } from '@/lib/seo/registry'

/**
 * 404.
 *
 * Added alongside the guide catch-all so an unmatched path returns a real,
 * helpful 404 instead of the framework default — and so it offers onward
 * links rather than being a dead end for a crawler or a visitor who followed
 * a stale URL.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl">
          There is nothing at this address
        </h1>
        <p className="mt-6 text-pretty text-lg leading-[1.7] text-foreground/70">
          The page you were looking for has moved or never existed. These are the places worth
          starting from instead.
        </p>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          <li>
            <Link href="/" className="block py-4 text-[15px] font-medium text-foreground hover:text-accent">
              Astris Space — home
            </Link>
          </li>
          <li>
            <Link href="/guides" className="block py-4 text-[15px] font-medium text-foreground hover:text-accent">
              All Astris guides
            </Link>
          </li>
          {clusters.map((c) => (
            <li key={c.id}>
              <Link href={c.hub} className="block py-4 text-[15px] font-medium text-foreground hover:text-accent">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
