import fs from 'node:fs'
import path from 'node:path'

/**
 * "Where you stay" — the property's own photographs.
 *
 * Each photo is shown only if its file is actually in /public, so the section
 * fills in as photos are added and never renders a broken image. With none
 * present it renders nothing at all.
 */

export interface PropertyPhoto {
  file: string
  alt: string
  caption?: string
  /** Portrait shots span two rows in the grid. */
  tall?: boolean
}

export const SAMBHAR_PROPERTY_PHOTOS: PropertyPhoto[] = [
  { file: '/astroventure-assets/sambhar/property/property-view.webp', alt: 'Mud-walled buildings with crenellated towers and a small pool, set among open fields', caption: 'The property' },
  { file: '/astroventure-assets/sambhar/property/mud-hut-room.webp', alt: 'A round mud-walled room with a double bed and a carved ceiling', caption: 'Mud-walled room', tall: true },
  { file: '/astroventure-assets/sambhar/property/room-double.webp', alt: 'A room with a double bed, air-conditioning and painted wall art', caption: 'Room', tall: true },
  { file: '/astroventure-assets/sambhar/property/pool.webp', alt: 'A small stone-edged pool on a lawn beside the mud-walled towers', caption: 'Pool' },
  { file: '/astroventure-assets/sambhar/property/tent.webp', alt: 'Inside a tent with a mattress and bright floral bedding', caption: 'Tent', tall: true },
  { file: '/astroventure-assets/sambhar/property/room-bathroom.webp', alt: 'A room with a television, looking through to an attached bathroom', caption: 'Room with attached bathroom', tall: true },
  { file: '/astroventure-assets/sambhar/property/courtyard.webp', alt: 'A sandy courtyard between mud-walled buildings with external staircases', caption: 'Courtyard' },
]

export default function PropertyGallery({ photos, heading = 'Where you stay' }: { photos: PropertyPhoto[]; heading?: string }) {
  const present = photos.filter((p) => fs.existsSync(path.join(process.cwd(), 'public', p.file)))
  if (present.length === 0) return null

  return (
    <section id="where-you-stay" className="scroll-mt-20 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-balance text-3xl font-light text-white sm:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          Rooms, traditional mud-walled rooms and tents around a courtyard with a pool, in open
          countryside. You choose the room type when you book.
        </p>
        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
          {present.map((p) => (
            <figure key={p.file} className={`group relative overflow-hidden rounded-2xl ${p.tall ? 'row-span-2' : ''}`}>
              <img src={p.file} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              {p.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-white/90">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
