import { cn } from '@/lib/utils'
import SectionHeading from '@/components/astroventure/section-heading'
import ScrollReveal from '@/components/astroventure/scroll-reveal'
import { astroStudentGallery } from '@/lib/astrophotography-data'

const spanCls: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
}

export default function AstroStudentGallery() {
  return (
    <section className="relative overflow-hidden bg-[var(--av-deep)] py-24 sm:py-28">
      <div className="av-divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Student Gallery"
          title={<>Made on expedition</>}
          subtitle="Photographs from future Astroventure batches will appear here."
        />

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:grid-cols-3 lg:grid-cols-4">
          {astroStudentGallery.map((img, i) => (
            <ScrollReveal
              key={img.alt + i}
              delay={(i % 4) * 50}
              direction="scale"
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]',
                spanCls[img.span ?? 'normal'],
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Placeholder imagery — to be replaced with photographs from future expeditions.
        </p>
      </div>
    </section>
  )
}
