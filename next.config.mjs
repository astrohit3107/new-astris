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
      { source: '/astroventure-spiti-26', destination: '/nakshatraalay/gurgaon', permanent: true },
      { source: '/spiti-countdown', destination: '/nakshatraalay/gurgaon', permanent: true },
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