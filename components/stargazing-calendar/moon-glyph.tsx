/**
 * A Moon drawn from the actual phase, not picked from eight pictures.
 *
 * The terminator is an ellipse whose semi-minor axis is r·|cos(elongation)|,
 * which is what the real terminator is: a circle on the sphere seen at an
 * angle. Illumination alone is not enough to draw it — 50% lit describes both
 * quarters — so the phase angle decides which limb is lit.
 */
export default function MoonGlyph({
  phaseAngle,
  size = 40,
  className = '',
  title,
}: {
  /** 0-360°: 0 new, 90 first quarter, 180 full, 270 last quarter. */
  phaseAngle: number
  size?: number
  className?: string
  title?: string
}) {
  const a = ((phaseAngle % 360) + 360) % 360
  const r = 50
  const cosA = Math.cos((a * Math.PI) / 180)
  const rx = Math.abs(cosA) * r
  // Waxing lights the right limb as seen from the northern hemisphere.
  const waxing = a < 180
  const gibbous = a > 90 && a < 270

  // Two arcs: the outer limb, and the terminator ellipse between the poles.
  const lit =
    a < 1 || a > 359
      ? null
      : `M 0,${-r}
         A ${r},${r} 0 0 ${waxing ? 1 : 0} 0,${r}
         A ${rx},${r} 0 0 ${gibbous === waxing ? 1 : 0} 0,${-r} Z`

  return (
    <svg
      viewBox="-55 -55 110 110"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title ?? `Moon, phase angle ${Math.round(a)} degrees`}
    >
      {title ? <title>{title}</title> : null}
      {/* The unlit disc stays faintly visible, as earthshine does. */}
      <circle cx="0" cy="0" r={r} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
      {lit ? <path d={lit} fill="#f4f1e8" /> : null}
    </svg>
  )
}
