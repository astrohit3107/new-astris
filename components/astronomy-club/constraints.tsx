import { CalendarClock, ClipboardCheck, IndianRupee, Users, type LucideIcon } from 'lucide-react'

/**
 * The four constraints from Scene 3, each with its own icon and tint, reused
 * by Scene 4 where the same four fold into one point of light.
 */
export const CONSTRAINT_ICONS: { icon: LucideIcon; tint: string }[] = [
  { icon: IndianRupee, tint: '#E8A33D' }, // Budget
  { icon: CalendarClock, tint: '#5CC6D6' }, // Timetable
  { icon: ClipboardCheck, tint: '#A8E4EC' }, // NEP 2020
  { icon: Users, tint: '#F2C77E' }, // Parents
]

export function ConstraintIcon({ index, size = 'md' }: { index: number; size?: 'sm' | 'md' }) {
  const { icon: Icon, tint } = CONSTRAINT_ICONS[index]
  const box = size === 'sm' ? 'h-11 w-11 rounded-xl' : 'h-14 w-14 rounded-2xl'
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center ${box}`}
      style={{
        background: `linear-gradient(145deg, ${tint}2E, ${tint}0D)`,
        boxShadow: `inset 0 0 0 1px ${tint}55, 0 8px 24px -10px ${tint}66`,
      }}
    >
      <Icon size={size === 'sm' ? 20 : 26} strokeWidth={1.6} color={tint} />
    </span>
  )
}

/**
 * Scene 4's opening graphic. The four constraint icons start at the corners;
 * when the scene scrolls into view (the Reveal parent sets data-in) they
 * glide to the centre and fold into a point of light, an orbit draws round
 * it, and the Astris mark appears: four problems, one answer.
 */
export function AnswerMark() {
  const corners = [
    [-118, -70],
    [118, -70],
    [-118, 70],
    [118, 70],
  ]
  return (
    <div className="relative mx-auto h-48 w-72 sm:w-80" aria-hidden="true">
      {corners.map(([x, y], i) => (
        <span
          key={i}
          className="club-merge-tile absolute left-1/2 top-1/2"
          style={{ ['--x' as string]: `${x}px`, ['--y' as string]: `${y}px` }}
        >
          <ConstraintIcon index={i} size="sm" />
        </span>
      ))}
      <span className="club-merge-glow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <svg viewBox="0 0 160 160" className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
        <circle className="club-merge-orbit" cx="80" cy="80" r="70" fill="none" stroke="#5CC6D6" strokeOpacity="0.55" strokeWidth="1.2" />
        <circle className="club-merge-orbit club-merge-orbit-2" cx="80" cy="80" r="56" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />
        <g className="club-merge-moon">
          <circle cx="150" cy="80" r="4" fill="#E8A33D" />
        </g>
      </svg>
      <img
        src="/logo.svg"
        alt=""
        width={64}
        height={64}
        className="club-merge-logo absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}
