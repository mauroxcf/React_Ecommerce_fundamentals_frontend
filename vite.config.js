import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Permite importar con "@/components/..." en lugar de "../../../components/..."
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
