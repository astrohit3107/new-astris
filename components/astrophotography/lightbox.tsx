'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { AstroGalleryImage } from '@/lib/astrophotography-data'

/**
 * Full-screen image viewer for the trainer portfolio and student gallery.
 * Opens on tile click; closes on backdrop click, the close button, or Escape.
 */
export default function Lightbox({
  image,
  onClose,
}: {
  image: AstroGalleryImage | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!image) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <figure className="flex max-h-full max-w-6xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 flex flex-col items-center gap-1 text-center">
          <span className="text-pretty text-sm text-white/80">{image.alt}</span>
          {image.credit && (
            <span className="text-xs font-medium tracking-wide text-white/45">{image.credit}</span>
          )}
        </figcaption>
      </figure>
    </div>
  )
}
