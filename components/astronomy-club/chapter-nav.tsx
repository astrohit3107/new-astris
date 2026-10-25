'use client'

import { useEffect, useState } from 'react'
import { CHAPTERS, type ChapterId } from '@/lib/astronomy-club-data'
import { clubTrack } from './motion'

/**
 * Scene progress.
 *  - Desktop: a slim fixed rail of chapter names on the right; click to jump.
 *  - Mobile: a small pill at the bottom with the current chapter and a
 *    "Book a demo" shortcut, shown once the hero has scrolled away.
 * Also records one `club_chapter_view` per chapter (scroll depth).
 */
export default function ChapterNav() {
  const [active, setActive] = useState<ChapterId>('question')
  const [past, setPast] = useState(false)
  const [nearForm, setNearForm] = useState(false)

  useEffect(() => {
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = (e.target as HTMLElement).dataset.chapter as ChapterId
          setActive(id)
          if (!seen.has(id)) {
            seen.add(id)
            clubTrack('club_chapter_view', { chapter: id })
          }
        }
      },
      // A chapter is "current" while it crosses the middle of the viewport.
      { rootMargin: '-50% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el))

    const form = document.getElementById('book-demo')
    const formIo = new IntersectionObserver(([e]) => setNearForm(e.isIntersecting))
    if (form) formIo.observe(form)

    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      formIo.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const label = CHAPTERS.find((c) => c.id === active)?.label

  return (
    <>
      <nav
        aria-label="Page chapters"
        className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${
          past ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ol className="club-rail space-y-1 rounded-2xl border border-white/10 bg-[#050B1F]/70 p-2 backdrop-blur-md">
          {CHAPTERS.map((c, i) => {
            const on = c.id === active
            return (
              <li key={c.id}>
                <a
                  href={`#ch-${c.id}`}
                  aria-current={on ? 'step' : undefined}
                  className={`flex min-h-7 items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    on ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${on ? 'bg-[#E8A33D]' : 'bg-white/30'}`}
                  />
                  <span className="tabular-nums text-white/60">{String(i + 1).padStart(2, '0')}</span>
                  {c.label}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div
        className={`fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 transition-all duration-500 xl:hidden ${
          past && !nearForm ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#050B1F]/85 p-1 pl-4 text-white shadow-2xl backdrop-blur-md">
          <span className="text-xs font-medium text-white/70" aria-live="polite">
            {label}
          </span>
          <a
            href="#book-demo"
            onClick={() => clubTrack('club_cta_demo_click', { from: 'chapter_pill' })}
            className="ml-2 rounded-full bg-[#E8A33D] px-4 py-2 text-xs font-bold text-[#0E1A3A]"
          >
            Book a free demo
          </a>
        </div>
      </div>
    </>
  )
}
