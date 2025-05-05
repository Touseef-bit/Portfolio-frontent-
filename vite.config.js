import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from "@tailwindcss/vite"
import flowbiteReact from "flowbite-react/plugin/vite";

  export default defineConfig({
    plugins: [tailwindcss(), react(), flowbiteReact()],
    server: {
      proxy: {
        '/api': {
          target: 'https://beckend-jm29gn7oq-touseef-alis-projects.vercel.app/api',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })