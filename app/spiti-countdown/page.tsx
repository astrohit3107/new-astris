'use client'

import { useEffect, useRef, useState } from 'react'
import { MISSION } from './mission.config'

/* ------------------------------------------------------------------ utils -- */
const pad = (n: number) => String(n).padStart(2, '0')
const TARGET = new Date(MISSION.COUNTDOWN_TARGET).getTime()

type Remaining = { d: number; h: number; m: number; s: number; done: boolean }

function remaining(): Remaining {
  const diff = TARGET - Date.now()
  if (isNaN(TARGET) || diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true }
  const s = Math.floor(diff / 1000)
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: false,
  }
}

export default function SpitiCountdownPage() {
  const mainRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Countdown is computed on the client only, to avoid SSR hydration mismatch.
  const [time, setTime] = useState<Remaining | null>(null)
  const [srText, setSrText] = useState('')
  const [signalLive, setSignalLive] = useState(false)

  /* ---------------------------------------------------------- countdown -- */
  useEffect(() => {
    let lastMinute = -1
    const tick = () => {
      const r = remaining()
      setTime(r)
      if (r.done) {
        setSrText('The observation window is now open.')
        return true
      }
      if (r.m !== lastMinute) {
        lastMinute = r.m
        setSrText(
          `${r.d} days, ${r.h} hours and ${r.m} minutes until the observation window opens.`,
        )
      }
      return false
    }
    if (tick()) return
    const id = setInterval(() => {
      if (tick()) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  /* ------------------------------------------------------------- signal -- */
  useEffect(() => {
    const id = setTimeout(() => setSignalLive(true), 900)
    return () => clearTimeout(id)
  }, [])

  /* ---------------------------------------------- scroll reveal + gauges -- */
  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const gauges = Array.from(root.querySelectorAll<HTMLElement>('.gauge[data-gauge]'))

    const fillGauge = (g: HTMLElement) => {
      const key = g.getAttribute('data-gauge') as keyof typeof MISSION
      const val = Math.max(0, Math.min(100, Number(MISSION[key]) || 0))
      const bar = g.querySelector<HTMLElement>('.gauge__fill')
      if (bar) requestAnimationFrame(() => (bar.style.width = val + '%'))
    }

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      gauges.forEach(fillGauge)
      return
    }

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            revealIO.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 120 + 'ms'
      revealIO.observe(el)
    })

    const gaugeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fillGauge(e.target as HTMLElement)
            gaugeIO.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    gauges.forEach((g) => gaugeIO.observe(g))

    return () => {
      revealIO.disconnect()
      gaugeIO.disconnect()
    }
  }, [])

  /* -------------------------------------------------------------- video -- */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      try {
        v.pause()
      } catch {}
      v.removeAttribute('autoplay')
      return
    }
    const reveal = () => v.classList.add('is-ready')
    if (v.readyState >= 2) reveal()
    v.addEventListener('loadeddata', reveal, { once: true })
    v.addEventListener('canplay', reveal, { once: true })

    const tryPlay = () => {
      if (!v.paused) return
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    tryPlay()
    v.addEventListener('canplay', tryPlay, { once: true })

    const evs: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown', 'scroll']
    const kick = () => {
      tryPlay()
      if (!v.paused) evs.forEach((ev) => window.removeEventListener(ev, kick))
    }
    evs.forEach((ev) => window.addEventListener(ev, kick, { passive: true }))
    return () => evs.forEach((ev) => window.removeEventListener(ev, kick))
  }, [])

  /* ----------------------------------------------- starfield + particles -- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars: any[] = []
    let parts: any[] = []
    let w = 0
    let h = 0
    let raf: number | null = null
    let t = 0

    const build = () => {
      let count = Math.round((w * h) / 9000)
      count = Math.max(40, Math.min(count, 220))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        base: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.9 + 0.25,
      }))
      const pc = Math.max(6, Math.min(Math.round(count / 12), 16))
      parts = Array.from({ length: pc }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.6,
        vy: -(Math.random() * 0.14 + 0.04),
        vx: (Math.random() - 0.5) * 0.05,
        a: Math.random() * 0.35 + 0.1,
        c: Math.random() > 0.5 ? '217,118,54' : '102,252,241',
      }))
    }
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }
    const frame = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        let tw = s.base + Math.sin(t * s.sp + s.tw) * 0.28
        if (tw < 0) tw = 0
        ctx.globalAlpha = tw
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      for (const p of parts) {
        p.y += p.vy
        p.x += p.vx
        if (p.y < -4) {
          p.y = h + 4
          p.x = Math.random() * w
        }
        ctx.globalAlpha = p.a
        ctx.fillStyle = `rgba(${p.c},1)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduce) {
      frame()
      if (raf) cancelAnimationFrame(raf)
      raf = null
    } else {
      frame()
    }

    const onVis = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = null
        }
      } else if (!raf && !reduce) {
        frame()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    let rt: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  /* --------------------------------------------------------- derived copy -- */
  const dd = time ? pad(time.d) : '--'
  const hh = time ? pad(time.h) : '--'
  const mm = time ? pad(time.m) : '--'
  const ss = time ? pad(time.s) : '--'
  const inlineTimer = time
    ? time.done
      ? 'this very window'
      : `${time.d} ${time.d === 1 ? 'day' : 'days'}, ${time.h} ${time.h === 1 ? 'hour' : 'hours'}`
    : 'the coming days'

  return (
    <>
      {/* ══════════════ FIXED BACKGROUND STACK ══════════════ */}
      <div className="bg" aria-hidden="true">
        <div className="bg__base" />
        <video
          className="bg__video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%23000'/%3E%3C/svg%3E"
        >
          <source src="/spiti-countdown/space-loop.mp4" type="video/mp4" />
        </video>
        <canvas className="bg__stars" ref={canvasRef} />
        <div className="bg__vignette" />
        <div className="bg__scanlines" />
        <div className="bg__grain" />
      </div>

      {/* Global HUD frame */}
      <div className="hud" aria-hidden="true">
        <span className="hud__corner hud__corner--tl" />
        <span className="hud__corner hud__corner--tr" />
        <span className="hud__corner hud__corner--bl" />
        <span className="hud__corner hud__corner--br" />
        <div className={`hud__signal${signalLive ? ' is-live' : ''}`}>
          <span className="hud__bar" />
          <span className="hud__bar" />
          <span className="hud__bar" />
          <span className="hud__bar" />
          <span className="hud__label">SIGNAL</span>
        </div>
        <div className="hud__coord">LAT/LON {MISSION.COORDINATES}</div>
      </div>

      <a className="skip-link" href="#extraction">
        Skip to clearance request
      </a>

      <main ref={mainRef}>
        {/* ═══════════ SECTION 1 · THE INTERCEPT ═══════════ */}
        <section className="intercept" id="intercept" aria-labelledby="intercept-head">
          <header className="comm" data-reveal>
            <p className="comm__line">
              SECURE COMM: <span>{MISSION.INITIATIVE}</span>
            </p>
            <p className="comm__line comm__line--dim">
              PROTOCOL: <span>{MISSION.PROTOCOL}</span>
            </p>
            <p className="comm__status">
              <span className="dot" /> <span>{MISSION.MISSION_STATUS}</span>
            </p>
          </header>

          <div className="intercept__core">
            <p className="intercept__eyebrow" data-reveal>
              COSMIC OBSERVATION WINDOW — T-MINUS
            </p>

            <div
              className="countdown"
              data-reveal
              role="timer"
              aria-label="Time remaining until the observation window opens"
            >
              <div className="countdown__digits" aria-hidden="true">
                <div className="countdown__unit">
                  <span className="countdown__value">{dd}</span>
                  <span className="countdown__label">DAYS</span>
                </div>
                <span className="countdown__sep">:</span>
                <div className="countdown__unit">
                  <span className="countdown__value">{hh}</span>
                  <span className="countdown__label">HRS</span>
                </div>
                <span className="countdown__sep">:</span>
                <div className="countdown__unit">
                  <span className="countdown__value">{mm}</span>
                  <span className="countdown__label">MIN</span>
                </div>
                <span className="countdown__sep">:</span>
                <div className="countdown__unit">
                  <span className="countdown__value">{ss}</span>
                  <span className="countdown__label">SEC</span>
                </div>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {srText}
              </p>
            </div>

            <h1 className="intercept__head" id="intercept-head" data-reveal>
              The window is narrowing.
            </h1>

            <p className="intercept__copy" data-reveal>
              Celestial mechanics do not wait for standard itineraries. In exactly{' '}
              <span className="inline-timer">{inlineTimer}</span>, the atmospheric
              conditions, lunar phase, and planetary alignments over the Spiti Valley
              will create an optimal, unrepeatable observation window.
            </p>
          </div>

          <a
            className="scrollcue"
            href="#void"
            data-reveal
            aria-label="Scroll down to decrypt mission parameters"
          >
            <span className="scrollcue__label">DECRYPT MISSION PARAMETERS</span>
            <span className="scrollcue__arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </section>

        {/* ═══════════ SECTION 2 · THE VOID ═══════════ */}
        <section className="void" id="void" aria-label="Mission narrative">
          <p className="void__line" data-reveal>
            For 2.5 million years, photons from the Andromeda Galaxy have crossed the
            freezing vacuum of deep space.
          </p>
          <p className="void__line" data-reveal>
            But in the final 100 kilometres of their journey, they are erased — by the
            glow of city lights and the density of sea-level atmosphere.
          </p>
          <p className="void__line void__line--accent" data-reveal>
            You have spent your life looking up through a filter.
            <br />
            We are taking you above it.
          </p>
          <p className="void__line" data-reveal>
            This is not a vacation. It is a tactical ascent to 12,500 feet, into a
            Bortle Class 1 dark-sky reserve — intercepting ancient light exactly as it
            was meant to be seen.
          </p>
        </section>

        {/* ═══════════ SECTION 3 · THE DOSSIER ═══════════ */}
        <section className="dossier" id="dossier" aria-labelledby="dossier-head">
          <div className="dossier__head" data-reveal>
            <p className="dossier__tag">// DECLASSIFIED READOUT</p>
            <h2 className="section-title" id="dossier-head">
              Mission Dossier
            </h2>
          </div>

          <div className="dossier__grid">
            <article className="panel" data-reveal>
              <h3 className="panel__title">Environment Parameters</h3>
              <dl className="datalist">
                <div className="datalist__row">
                  <dt>Coordinates</dt>
                  <dd>{MISSION.COORDINATES}</dd>
                </div>
                <div className="datalist__row">
                  <dt>Altitude</dt>
                  <dd>{MISSION.ALTITUDE}</dd>
                </div>
                <div className="datalist__row">
                  <dt>Atmospheric distortion</dt>
                  <dd>{MISSION.DISTORTION}</dd>
                </div>
                <div className="datalist__row">
                  <dt>Visibility</dt>
                  <dd>{MISSION.VISIBILITY}</dd>
                </div>
                <div className="datalist__row">
                  <dt>Bortle class</dt>
                  <dd>
                    <span className="chip">{MISSION.BORTLE_CLASS}</span>
                  </dd>
                </div>
              </dl>

              <div className="gauges">
                <div className="gauge" data-gauge="SKY_QUALITY">
                  <div className="gauge__head">
                    <span>Sky quality meter</span>
                    <span className="gauge__num">{MISSION.SKY_QUALITY}%</span>
                  </div>
                  <div className="gauge__track">
                    <span className="gauge__fill" />
                  </div>
                </div>
                <div className="gauge" data-gauge="ATMOSPHERIC_TRANSPARENCY">
                  <div className="gauge__head">
                    <span>Atmospheric transparency</span>
                    <span className="gauge__num">{MISSION.ATMOSPHERIC_TRANSPARENCY}%</span>
                  </div>
                  <div className="gauge__track">
                    <span className="gauge__fill" />
                  </div>
                </div>
                <div className="gauge" data-gauge="MOON_ILLUMINATION">
                  <div className="gauge__head">
                    <span>Moon illumination</span>
                    <span className="gauge__num">{MISSION.MOON_ILLUMINATION}%</span>
                  </div>
                  <div className="gauge__track">
                    <span className="gauge__fill gauge__fill--dim" />
                  </div>
                </div>
              </div>
            </article>

            <article className="panel" data-reveal>
              <h3 className="panel__title">Arsenal &amp; Optics</h3>
              <dl className="datalist">
                <div className="datalist__row datalist__row--stack">
                  <dt>Optics</dt>
                  <dd>{MISSION.OPTICS}</dd>
                </div>
                <div className="datalist__row datalist__row--stack">
                  <dt>Guidance</dt>
                  <dd>{MISSION.GUIDANCE}</dd>
                </div>
                <div className="datalist__row datalist__row--stack">
                  <dt>Status</dt>
                  <dd className="dd--status">
                    <span className="dot dot--sm" />
                    <span>{MISSION.MISSION_STATUS}</span>
                  </dd>
                </div>
              </dl>

              <div className="gauges">
                <div className="gauge" data-gauge="OBSERVER_READINESS">
                  <div className="gauge__head">
                    <span>Observer readiness</span>
                    <span className="gauge__num">{MISSION.OBSERVER_READINESS}%</span>
                  </div>
                  <div className="gauge__track">
                    <span className="gauge__fill" />
                  </div>
                </div>
              </div>

              <p className="panel__stamp">
                WINDOW OPENS {MISSION.MISSION_DATE} · {MISSION.COORDINATES}
              </p>
            </article>
          </div>
        </section>

        {/* ═══════════ SECTION 4 · THE EXTRACTION ═══════════ */}
        <section className="extraction" id="extraction" aria-labelledby="extraction-head">
          <div className="extraction__inner" data-reveal>
            <p className="extraction__tag">// EXTRACTION POINT</p>
            <h2 className="section-title" id="extraction-head">
              Initialize telemetry
            </h2>
            <p className="extraction__copy">
              The Astroventure Spiti sequence is heavily restricted due to equipment
              logistics and precise astronomical constraints. Submit your coordinates
              to request clearance for the upcoming window.
            </p>

            <a
              className="clearance"
              href={MISSION.GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Request clearance — opens the Astroventure Spiti waitlist form in a new tab"
            >
              <span className="clearance__bracket">[</span>
              <span className="clearance__text">REQUEST CLEARANCE</span>
              <span className="clearance__bracket">]</span>
            </a>

            <p className="extraction__meta">
              <span className="dot dot--sm" />
              CLEARANCE WINDOW OPENS {MISSION.MISSION_DATE} · {MISSION.MISSION_STATUS}
            </p>
          </div>

          <footer className="footer">
            <p>
              {MISSION.INITIATIVE} // ASTROVENTURE — PROTOCOL {MISSION.PROTOCOL}
            </p>
            <p className="footer__dim">TRANSMISSION ENDS · {MISSION.COORDINATES}</p>
          </footer>
        </section>
      </main>
    </>
  )
}
