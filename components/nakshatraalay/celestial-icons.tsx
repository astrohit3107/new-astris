/**
 * Celestial icons.
 *
 * Drawn rather than pulled from an icon set: a generic "star" glyph for both
 * Saturn and a globular cluster tells the reader nothing. These are simplified
 * but truthful — Saturn has its ring, Jupiter its banding and red spot, a
 * galaxy is a spiral, a cluster is scattered points, a nebula is diffuse.
 */

const S = ({ size = 24, children, ...rest }: { size?: number; children: React.ReactNode } & React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
)

export function MercuryIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="6" fill="#b9b2a8" />
      <circle cx="10" cy="10" r="1.1" fill="#8e877d" />
      <circle cx="14" cy="14.5" r="0.8" fill="#8e877d" />
    </S>
  )
}

export function VenusIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="6.5" fill="#e8cf9a" />
      <path d="M6 10.5c4 1 8-1.5 12 0" stroke="#cbab6d" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6.5 14c4 1 7.5-1 11 .5" stroke="#cbab6d" strokeWidth="0.9" strokeLinecap="round" />
    </S>
  )
}

export function MarsIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="6" fill="#c1553a" />
      <path d="M9 9.5c1.5.6 3 .2 4.5-.4" stroke="#8f3a26" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.4" fill="#e08a6d" opacity=".8" />
    </S>
  )
}

export function JupiterIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="7" fill="#d9b98c" />
      <path d="M5.4 9.5h13.2M5 12h14M5.4 14.5h13.2" stroke="#a8814f" strokeWidth="1.1" strokeLinecap="round" />
      <ellipse cx="14.5" cy="14.4" rx="1.9" ry="1.2" fill="#b4553c" />
    </S>
  )
}

export function SaturnIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="5.2" fill="#e0c896" />
      <path d="M4 14.4c3.6 2 12.4 2 16-2.8" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.6 13.2c3.4 1.6 11.6 1.6 14.8-2.4" stroke="#f0dcb4" strokeWidth="0.8" strokeLinecap="round" />
    </S>
  )
}

export function NebulaIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="7" fill="#7c5bd6" opacity=".28" />
      <circle cx="10.5" cy="11" r="4.2" fill="#a06ad8" opacity=".45" />
      <circle cx="13.5" cy="13.5" r="3" fill="#e08bb8" opacity=".45" />
      <circle cx="11" cy="11" r="1" fill="#fff" />
      <circle cx="14.2" cy="13.8" r="0.7" fill="#fff" opacity=".85" />
    </S>
  )
}

export function GalaxyIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <ellipse cx="12" cy="12" rx="8" ry="3.4" fill="#8fa8e0" opacity=".25" transform="rotate(-25 12 12)" />
      <path
        d="M6.5 13.8c2-3.6 9-4.6 11-1.6M17.5 10.2c-2 3.6-9 4.6-11 1.6"
        stroke="#c3d2f5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="12" rx="2" ry="1.5" fill="#fff5d6" transform="rotate(-25 12 12)" />
    </S>
  )
}

export function ClusterIcon({ size }: { size?: number }) {
  return (
    <S size={size}>
      <circle cx="12" cy="12" r="7" fill="#9ec5f0" opacity=".16" />
      {[
        [12, 8.4, 1.3], [9.2, 10.6, 1], [14.8, 10.4, 1], [10.4, 14, 0.9],
        [13.8, 13.8, 1.1], [12, 11.6, 1.2], [7.8, 12.6, 0.7], [16, 13.2, 0.7],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#eaf2ff" />
      ))}
    </S>
  )
}

/** A moon drawn at the given illuminated fraction, waxing or waning. */
export function MoonGlyph({
  illumination,
  waxing,
  size = 24,
}: {
  illumination: number
  waxing: boolean
  size?: number
}) {
  // The terminator is an ellipse whose x-radius tracks how much is lit.
  const k = Math.abs(1 - 2 * illumination)
  const litOnRight = waxing
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" fill="#1b1f2a" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
      <defs>
        <clipPath id={`half-${waxing ? 'w' : 'n'}-${Math.round(illumination * 100)}`}>
          <rect x={litOnRight ? 12 : 3} y="3" width="9" height="18" />
        </clipPath>
      </defs>
      {illumination > 0.02 && (
        <>
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="#f2ecd9"
            clipPath={`url(#half-${waxing ? 'w' : 'n'}-${Math.round(illumination * 100)})`}
          />
          <ellipse
            cx="12"
            cy="12"
            rx={9 * k}
            ry="9"
            fill={illumination < 0.5 ? '#1b1f2a' : '#f2ecd9'}
          />
        </>
      )}
    </svg>
  )
}

export const PLANET_ICON = {
  Mercury: MercuryIcon,
  Venus: VenusIcon,
  Mars: MarsIcon,
  Jupiter: JupiterIcon,
  Saturn: SaturnIcon,
} as const

export const DSO_ICON = {
  nebula: NebulaIcon,
  galaxy: GalaxyIcon,
  cluster: ClusterIcon,
} as const
