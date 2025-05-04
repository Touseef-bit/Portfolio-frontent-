import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from "@tailwindcss/vite"
import flowbiteReact from "flowbite-react/plugin/vite";

  export default defineConfig({
    plugins: [tailwindcss(), react(), flowbiteReact()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })