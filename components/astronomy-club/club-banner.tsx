import { ArrowRight } from 'lucide-react'
import { CLUB_PATH } from '@/lib/astronomy-club-data'

/**
 * Cross-link into /astronomy-club from /astroed and the homepage programmes.
 * Text only: there is no real photograph of the club yet, and the site does
 * not use stand-in imagery for programmes.
 */
export default function ClubBanner({ className = '' }: { className?: string }) {
  return (
    <a
      href={CLUB_PATH}
      className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#050B1F] p-7 text-white ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:p-9 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_38%_34%,#FBF6E9,#A9A190_70%)] opacity-20 transition-opacity duration-500 group-hover:opacity-30"
      />
      <span className="relative max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5CC6D6]">
          New · Astris Astronomy Club
        </span>
        <span className="mt-3 block text-balance text-2xl font-semibold leading-snug sm:text-3xl">
          Start with a weekly astronomy club, at zero cost to your school
        </span>
        <span className="mt-2 block text-pretty text-sm leading-relaxed text-white/70">
          32 NCERT-linked sessions a year for Grades 4–12, with real telescopes and family sky-watches.
          The school gives a room and a slot; Astris runs the rest.
        </span>
      </span>
      <span className="relative inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#E8A33D] px-6 py-3 text-sm font-bold text-[#0E1A3A] sm:self-auto">
        See how the club works
        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  )
}
