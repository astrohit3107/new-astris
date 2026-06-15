import { cn } from '@/lib/utils'

/** Deterministic pseudo-random so SSR and client markup match (no hydration mismatch). */
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

interface StarfieldProps {
  className?: string
  /** number of stars */
  count?: number
  /** show drifting aurora glows */
  aurora?: boolean
  /** show occasional shooting stars */
  shootingStars?: boolean
}

/**
 * Decorative animated star background. Pure CSS — no canvas, no JS at runtime,
 * so it is cheap and renders on the server. Sits behind content via -z-10.
 */
export default function Starfield({
  className,
  count = 90,
  aurora = true,
  shootingStars = true,
}: StarfieldProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const top = seeded(i + 1) * 100
    const left = seeded(i + 101) * 100
    const size = 0.5 + seeded(i + 201) * 1.8
    const duration = 2.5 + seeded(i + 301) * 5
    const delay = seeded(i + 401) * 6
    const opacity = 0.3 + seeded(i + 501) * 0.6
    return { top, left, size, duration, delay, opacity }
  })

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Aurora / nebula glows */}
      {aurora && (
        <>
          <div className="animate-aurora absolute -top-1/4 left-[-10%] h-[55vh] w-[60vw] rounded-full bg-[var(--av-nebula)] opacity-25 blur-[120px]" />
          <div
            className="animate-aurora absolute bottom-[-15%] right-[-10%] h-[50vh] w-[55vw] rounded-full bg-[var(--av-aurora)] opacity-20 blur-[130px]"
            style={{ animationDelay: '6s' }}
          />
        </>
      )}

      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars && (
        <>
          <span className="absolute left-[12%] top-[18%] h-px w-24 -rotate-[35deg] bg-gradient-to-r from-white to-transparent opacity-0 [animation:av-shoot_8s_ease-in_infinite] [animation-delay:3s]" />
          <span className="absolute left-[62%] top-[8%] h-px w-20 -rotate-[35deg] bg-gradient-to-r from-white to-transparent opacity-0 [animation:av-shoot_11s_ease-in_infinite] [animation-delay:7s]" />
        </>
      )}
    </div>
  )
}
