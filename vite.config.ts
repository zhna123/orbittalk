// see https://vitest.dev/config/
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dns from 'dns'

// to open localhost
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // make all imports from Vitest global, so that you don't need to perform these imports (e.g. expect) in each file manually
    environment: 'jsdom',
    // mockReset: true, // this option will reset all mocks before each test run
    setupFiles: './tests/setup.ts',
  },
  server: {
    open: '.',
    host: 'localhost'
  }
})
