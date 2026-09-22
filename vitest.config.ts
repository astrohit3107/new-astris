import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
  },
  test: {
    // The astronomy suite searches real ephemerides over multi-year windows;
    // a few of those searches are genuinely slow.
    testTimeout: 60_000,
    include: ['lib/**/__tests__/**/*.test.ts'],
  },
})
