import { ImageResponse } from 'next/og'

/**
 * Open Graph card (1200×630): the night sky, the Moon seen through the three
 * band lenses, and the title. Generated at build time by next/og.
 */
export const alt = 'Astris Astronomy Club: one Moon seen through three lenses, for Grades 4–12'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const STARS = Array.from({ length: 90 }, (_, i) => {
  const x = (i * 397) % 1200
  const y = (i * 211 + (i % 7) * 37) % 630
  return { x, y, r: i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1.4, o: 0.35 + ((i * 13) % 60) / 100 }
})

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(135deg, #050B1F 0%, #0E1A3A 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {STARS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: 999,
              background: '#FFFFFF',
              opacity: s.o,
            }}
          />
        ))}

        {/* The Moon and the three lenses. */}
        <div style={{ position: 'absolute', right: 110, top: 115, width: 400, height: 400, display: 'flex' }}>
          <div
            style={{
              position: 'absolute',
              inset: 30,
              borderRadius: 999,
              background: 'radial-gradient(circle at 38% 34%, #FBF6E9 0%, #E3DCCB 62%, #A9A190 100%)',
              boxShadow: '0 0 90px rgba(244,235,211,0.35)',
            }}
          />
          {[
            { c: '#E8A33D', x: -70, y: 10 },
            { c: '#0B7285', x: 0, y: 0 },
            { c: '#5CC6D6', x: 70, y: -10 },
          ].map((l, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 60 + l.x,
                top: 60 + l.y,
                width: 280,
                height: 280,
                borderRadius: 999,
                border: `6px solid ${l.c}`,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', left: 80, top: 150, display: 'flex', flexDirection: 'column', width: 600 }}>
          <div style={{ color: '#5CC6D6', fontSize: 26, fontWeight: 700, letterSpacing: 6 }}>ASTRIS SPACE</div>
          <div style={{ color: '#FFFFFF', fontSize: 84, fontWeight: 800, lineHeight: 1.02, marginTop: 18 }}>
            Astris Astronomy Club
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 30, marginTop: 26, lineHeight: 1.3 }}>
            Weekly, NCERT-linked astronomy for Grades 4–12. Zero cost to schools.
          </div>
          <div style={{ display: 'flex', marginTop: 34, gap: 14 }}>
            {[
              ['Explorers', '#E8A33D'],
              ['Navigators', '#0B7285'],
              ['Astronomers', '#5CC6D6'],
            ].map(([n, c]) => (
              <div
                key={n}
                style={{
                  display: 'flex',
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: `2px solid ${c}`,
                  color: '#FFFFFF',
                  fontSize: 22,
                }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
