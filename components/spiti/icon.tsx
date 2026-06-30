import {
  Aperture,
  Award,
  BedDouble,
  Bus,
  Camera,
  Compass,
  FolderDown,
  Gift,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  Moon,
  NotebookPen,
  Orbit,
  Package,
  Shirt,
  Sparkles,
  Star,
  Sun,
  Telescope,
  Users,
  UsersRound,
  Utensils,
  type LucideProps,
} from 'lucide-react'

/**
 * Maps the icon-name strings stored in `lib/spiti-data.ts` to lucide icons,
 * so content stays plain data and components render the right glyph.
 */
const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Aperture,
  Award,
  BedDouble,
  Bus,
  Camera,
  Compass,
  FolderDown,
  Gift,
  GraduationCap,
  Image: ImageIcon,
  MapPin,
  Moon,
  NotebookPen,
  Orbit,
  Package,
  Shirt,
  Sparkles,
  Star,
  Sun,
  Telescope,
  Users,
  UsersRound,
  Utensils,
}

export default function SpitiIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = ICONS[name] ?? Sparkles
  return <Cmp {...props} />
}
