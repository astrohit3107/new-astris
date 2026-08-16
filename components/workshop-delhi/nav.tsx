'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'Learn', href: '#outcomes' },
  { label: 'Narrowband', href: '#narrowband' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Trainer', href: '#trainer' },
  { label: 'Dates', href: '#dates' },
  { label: 'FAQ', href: '#faq' },
]

export default function WorkshopNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass-strong border-b border-white/10 py-2' : 'bg-transparent py-4',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="group flex items-center gap-2.5">
          <img src="/logo.svg" alt="Astris Space" className="h-8 w-8 rounded-md ring-1 ring-white/20" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-white">
              Deep-Sky Delhi
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--av-gold)]">
              Astrophotography Workshop
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-white/70 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[var(--av-gold)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book"
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--av-gold)] lg:inline-block"
        >
          Request a Seat
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          'glass-strong overflow-hidden border-t border-white/10 transition-all duration-500 lg:hidden',
          open ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
          >
            Request a Seat
          </a>
        </nav>
      </div>
    </header>
  )
}
