'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

/**
 * Dark / light switch for the main site.
 *
 * Renders a stable, correctly-sized placeholder until mounted so the button
 * never causes layout shift and never renders the wrong icon during hydration
 * (the server cannot know the resolved theme).
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'
  const base =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition-colors duration-300 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  if (!mounted) {
    // Non-interactive placeholder: same box, no icon, hidden from AT.
    return <span aria-hidden="true" className={`${base} ${className}`} />
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`${base} ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
