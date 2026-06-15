import { cn } from '@/lib/utils'
import ScrollReveal from './scroll-reveal'

interface Props {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: Props) {
  return (
    <ScrollReveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--av-gold)]',
          )}
        >
          <span className="h-px w-6 bg-[var(--av-gold)]/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base font-light leading-relaxed text-white/65">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  )
}
