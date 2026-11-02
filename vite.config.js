import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'logo-mark.png', 'logo-full.png', 'anim-mark.png', 'anim-l0.png', 'anim-l1.png', 'anim-l2.png', 'anim-rule.png', 'anim-tag.png'],
      workbox: { globPatterns: ['**/*.{js,css,html,png,woff2,svg}'] },
      manifest: {
        name: 'dr.x — Classic Health & Healing',
        short_name: 'dr.x',
        start_url: './',
        display: 'standalone',
        background_color: '#EAF4FD',
        theme_color: '#1F73BD',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
