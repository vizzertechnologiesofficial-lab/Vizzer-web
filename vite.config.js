import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is relative so the build also works when served from a sub path
// (e.g. a preview link). For vizzertechnologies.com root hosting this is harmless.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
