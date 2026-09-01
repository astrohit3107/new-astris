import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * Navigation for the Nakshatraalay pages.
 *
 * These routes render their own dark <main> without the site header, which
 * left them with no way back — a visitor who landed on an experience page was
 * stuck unless they used the browser's back button. This is a fixed bar with
 * an explicit "back" target plus the sibling sections.
 *
 * `backHref` / `backLabel` let a detail page point at its own parent
 * (an experience goes back to the experience list, not to the homepage).
 */
export default function NakshatraalayNav({
  backHref = '/',
  backLabel = 'Astris Space',
}: {
  backHref?: string
  backLabel?: string
}) {
  const links = [
    { href: '/nakshatraalay/gurgaon', label: 'Destination' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/sky-calendar', label: 'Sky calendar' },
    { href: '/first-light', label: 'First Light' },
  ]

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060a]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={backHref}
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
            <ArrowLeft size={14} />
          </span>
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Nakshatraalay">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
