'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './motion'

/**
 * The night sky behind every dark scene.
 *
 * One fixed canvas, a few hundred points in three depth layers. It starts with
 * no stars at all (Scene 1's single star is its own element) and fills in over
 * the first screen of scrolling — the one star "multiplies into a full sky".
 * Layers drift at different rates as the page scrolls (slow parallax).
 *
 * The loop only runs while a `[data-sky]` scene is on screen and the tab is
 * visible. Light scenes are opaque and simply cover it. Reduced motion: every
 * star, drawn once, no twinkle and no parallax.
 */

const COUNT = 320

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = prefersReducedMotion()

    // Deterministic pseudo-random so the sky is the same on every visit.
    let seed = 7
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646

    const stars = Array.from({ length: COUNT }, (_, i) => {
      const layer = i % 3
      return {
        x: rnd(),
        y: rnd(),
        r: 0.35 + rnd() * (layer === 2 ? 1.25 : 0.8),
        depth: [0.03, 0.07, 0.14][layer],
        tw: rnd() * Math.PI * 2,
        speed: 0.4 + rnd() * 1.2,
        // Order in which stars appear while the hero scrolls away.
        rank: rnd(),
        tint: rnd() < 0.12 ? '#F6D9A0' : rnd() < 0.2 ? '#BFE7EE' : '#FFFFFF',
      }
    })

    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const draw = (t: number) => {
      const sy = reduced ? 0 : window.scrollY
      // 0 → 1 over the first ~0.8 screens of scroll.
      const reveal = reduced ? 1 : Math.min(1, sy / (h * 0.8))
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        if (s.rank > reveal) continue
        const y = (((s.y * h - sy * s.depth) % h) + h) % h
        const twinkle = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.tw)
        ctx.globalAlpha = twinkle * Math.min(1, (reveal - s.rank) * 8 + 0.2)
        ctx.fillStyle = s.tint
        ctx.beginPath()
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    if (reduced) {
      draw(0)
      const onResize = () => {
        resize()
        draw(0)
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    let raf = 0
    let visibleScenes = 0
    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      const run = visibleScenes > 0 && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(loop)
      if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target)
        else seen.delete(e.target)
      }
      visibleScenes = seen.size
      sync()
    })
    document.querySelectorAll('[data-sky]').forEach((el) => io.observe(el))

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
