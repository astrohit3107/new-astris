/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Astroventure Spiti '26 has been retired. Both of its URLs were indexed, so
   * they redirect permanently to the current destination rather than 404ing —
   * old links and search results keep working, and the accumulated ranking
   * signal transfers instead of being discarded.
   */
  async redirects() {
    return [
      // Retired products go to the trip that is actually running. Spiti used to
      // point at Nakshatraalay, which is closed while it moves.
      { source: '/astroventure-spiti-26', destination: '/astroventure-nights/sambhar-lake', permanent: true },
      { source: '/spiti-countdown', destination: '/astroventure-nights/sambhar-lake', permanent: true },
      // Nakshatraalay's old Gurgaon site, removed from the calendar 17 Nov 2026.
      { source: '/stargazing-calendar/nakshatraalay-gurgaon', destination: '/stargazing-calendar/sambhar-lake', permanent: true },
      // Policies became site-wide on 17 Nov 2026, covering every booking rather
      // than one venue. Old addresses keep working.
      { source: '/nakshatraalay/gurgaon/cancellation', destination: '/cancellation-policy', permanent: true },
      { source: '/nakshatraalay/gurgaon/rescheduling', destination: '/rescheduling-policy', permanent: true },
      { source: '/nakshatraalay/gurgaon/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/astroventure-nights/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/astroventure-nights/terms', destination: '/terms', permanent: true },
      // Tijara retired 17 Nov 2026.
      { source: '/astroventure-nights/tijara', destination: '/astroventure-nights/sambhar-lake', permanent: true },
    ]
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig