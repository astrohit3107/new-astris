/**
 * Decorative SVG artwork for /astronomy-club. Every piece is aria-hidden: the
 * information it illustrates is always also in the page text.
 */

type SvgProps = { className?: string }

/** A full Moon with soft maria and a few craters. `id` keeps gradients unique. */
export function Moon({ className = '', id = 'moon' }: SvgProps & { id?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={`${id}-g`} cx="38%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#FBF6E9" />
          <stop offset="62%" stopColor="#E3DCCB" />
          <stop offset="100%" stopColor="#A9A190" />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#F4EBD3" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F4EBD3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="99" fill={`url(#${id}-glow)`} />
      <circle cx="100" cy="100" r="70" fill={`url(#${id}-g)`} />
      <g fill="#8E8777" opacity="0.38">
        <ellipse cx="78" cy="78" rx="18" ry="13" />
        <ellipse cx="112" cy="70" rx="12" ry="9" />
        <ellipse cx="120" cy="104" rx="20" ry="15" />
        <ellipse cx="86" cy="118" rx="11" ry="8" />
      </g>
      <g fill="none" stroke="#8E8777" strokeOpacity="0.5" strokeWidth="1.2">
        <circle cx="96" cy="146" r="6" />
        <circle cx="134" cy="138" r="4" />
        <circle cx="62" cy="104" r="3.5" />
        <circle cx="140" cy="82" r="3" />
      </g>
    </svg>
  )
}

/** A thin crescent, lit on the right. */
export function Crescent({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <defs>
        <mask id="crescent-mask">
          <rect width="120" height="120" fill="#fff" />
          <circle cx="46" cy="56" r="44" fill="#000" />
        </mask>
        <radialGradient id="crescent-glow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#F6EBCB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F6EBCB" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#crescent-glow)" opacity="0.5" />
      <circle cx="60" cy="60" r="44" fill="#F6EBCB" mask="url(#crescent-mask)" />
    </svg>
  )
}

/** A small satellite: body plus two solar panels. */
export function Satellite({ className = '', color = '#5CC6D6' }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 64 32" aria-hidden="true" className={className}>
      <g stroke={color} strokeWidth="1.4" fill="none">
        <rect x="2" y="9" width="18" height="14" rx="1.5" />
        <path d="M2 16h18M8 9v14M14 9v14" strokeOpacity="0.6" />
        <rect x="44" y="9" width="18" height="14" rx="1.5" />
        <path d="M44 16h18M50 9v14M56 9v14" strokeOpacity="0.6" />
        <path d="M20 16h6M38 16h6" />
      </g>
      <rect x="26" y="10" width="12" height="12" rx="3" fill={color} />
      <circle cx="32" cy="16" r="2" fill="#050B1F" />
    </svg>
  )
}

/** The club emblem: a point of light inside an orbit with three band dots. */
export function Emblem({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="emblem-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FCE7B8" />
          <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="34" fill="url(#emblem-core)" />
      <ellipse
        cx="80"
        cy="80"
        rx="66"
        ry="26"
        fill="none"
        stroke="#5CC6D6"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        transform="rotate(-24 80 80)"
      />
      <circle cx="80" cy="80" r="56" fill="none" stroke="#ffffff" strokeOpacity="0.14" />
      <circle cx="22" cy="104" r="5" fill="#E8A33D" />
      <circle cx="132" cy="46" r="5" fill="#0B7285" stroke="#5CC6D6" />
      <circle cx="140" cy="62" r="4" fill="#5CC6D6" />
    </svg>
  )
}

/** Telescope on a tripod, as a flat silhouette. */
export function TelescopeSilhouette({ className = '' }: SvgProps) {
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <rect x="58" y="62" width="150" height="26" rx="6" transform="rotate(-24 133 75)" />
        <rect x="188" y="24" width="30" height="36" rx="4" transform="rotate(-24 203 42)" />
        <rect x="40" y="96" width="30" height="12" rx="3" transform="rotate(-24 55 102)" />
        <circle cx="118" cy="108" r="9" />
        <path d="M118 110 L82 198 L90 198 L120 122 Z" />
        <path d="M118 110 L154 198 L146 198 L116 122 Z" />
        <path d="M117 112 L114 198 L122 198 L121 112 Z" />
      </g>
    </svg>
  )
}

/** Small star glyph used in level badges. */
export function StarGlyph({ className = '', color = '#E8A33D' }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.5l2.6 6.1 6.6.6-5 4.4 1.5 6.5L12 16.8 6.3 20.1l1.5-6.5-5-4.4 6.6-.6z"
        fill={color}
      />
    </svg>
  )
}
