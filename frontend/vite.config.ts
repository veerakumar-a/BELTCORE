import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/BELTCORE/',
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
  },
})
