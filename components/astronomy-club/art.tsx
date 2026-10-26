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
