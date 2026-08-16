import {
  Aperture,
  Atom,
  Camera,
  Clock,
  Filter,
  GraduationCap,
  MapPin,
  Moon,
  Orbit,
  Sparkles,
  Sprout,
  Telescope,
  Users,
  UsersRound,
  type LucideProps,
} from 'lucide-react'

/** Icon-name → lucide glyph map for the Delhi workshop content. */
const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Aperture,
  Atom,
  Camera,
  Clock,
  Filter,
  GraduationCap,
  MapPin,
  Moon,
  Orbit,
  Sparkles,
  Sprout,
  Telescope,
  Users,
  UsersRound,
}

export default function WorkshopIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = ICONS[name] ?? Sparkles
  return <Cmp {...props} />
}
