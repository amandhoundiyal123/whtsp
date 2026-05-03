import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Env vars prefixed with VITE_ are automatically exposed to the client
  // No extra config needed — just use import.meta.env.VITE_BACKEND_URL
})
