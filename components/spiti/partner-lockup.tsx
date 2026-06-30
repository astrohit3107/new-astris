import { cn } from '@/lib/utils'
import { SPITI_PARTNER, SPITI_BRAND_LOGO, SPITI_CONTACT } from '@/lib/spiti-data'

/**
 * Premium co-branded lockup: Astris Space × Eeshum Travels.
 * Renders the two brand marks with balanced visual weight and a tasteful
 * "In partnership with" frame — intentional co-branding, not a sponsor badge.
 *
 *  variant="hero"   — prominent, glass pill for use near hero sections
 *  variant="inline" — compact line for overview / booking contexts
 */
export default function PartnerLockup({
  variant = 'inline',
  className,
}: {
  variant?: 'hero' | 'inline'
  className?: string
}) {
  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 backdrop-blur-md',
          className,
        )}
      >
        <img
          src={SPITI_BRAND_LOGO}
          alt={SPITI_CONTACT.brand}
          className="h-8 w-8 rounded-md ring-1 ring-white/20 sm:h-9 sm:w-9"
        />
        <span className="text-lg font-light text-white/30">×</span>
        <img
          src={SPITI_PARTNER.logo}
          alt={SPITI_PARTNER.name}
          className="h-8 w-auto max-w-[120px] object-contain sm:h-9"
        />
        <span className="hidden h-8 w-px bg-white/15 sm:block" />
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
            {SPITI_PARTNER.prefix}
          </span>
          <span className="text-sm font-semibold text-white">{SPITI_PARTNER.name}</span>
        </span>
      </div>
    )
  }

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
        {SPITI_PARTNER.prefix}
      </span>
      <span className="flex items-center gap-2.5">
        <img
          src={SPITI_BRAND_LOGO}
          alt={SPITI_CONTACT.brand}
          className="h-7 w-7 rounded-md ring-1 ring-white/20"
        />
        <span className="text-sm font-light text-white/30">×</span>
        <img
          src={SPITI_PARTNER.logo}
          alt={SPITI_PARTNER.name}
          className="h-7 w-auto max-w-[110px] object-contain"
        />
      </span>
    </div>
  )
}
