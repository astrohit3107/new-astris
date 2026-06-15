interface Props {
  className?: string
}

/**
 * A clean telescope-on-tripod silhouette used as a foreground element in
 * hero sections. Uses currentColor so it can be tinted via text color.
 */
export default function TelescopeSilhouette({ className }: Props) {
  return (
    <svg
      viewBox="0 0 300 360"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        {/* Optical tube */}
        <rect
          x="70"
          y="78"
          width="170"
          height="34"
          rx="17"
          transform="rotate(-22 70 78)"
        />
        {/* Dew shield (objective end) */}
        <rect
          x="222"
          y="20"
          width="26"
          height="44"
          rx="6"
          transform="rotate(-22 222 20)"
        />
        {/* Finder scope */}
        <rect
          x="150"
          y="58"
          width="46"
          height="10"
          rx="5"
          transform="rotate(-22 150 58)"
        />
        {/* Focuser / eyepiece */}
        <rect
          x="78"
          y="150"
          width="14"
          height="30"
          rx="6"
          transform="rotate(-22 78 150)"
        />
        {/* Mount head */}
        <circle cx="120" cy="150" r="16" />
        {/* Tripod legs */}
        <path d="M116 158 L70 350 L86 350 L126 162 Z" />
        <path d="M124 158 L178 350 L162 350 L116 162 Z" />
        <path d="M120 156 L118 350 L132 350 L130 156 Z" />
        {/* Accessory tray */}
        <rect x="96" y="270" width="56" height="8" rx="4" />
      </g>
    </svg>
  )
}
