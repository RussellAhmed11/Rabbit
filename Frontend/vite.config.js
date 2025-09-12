import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme:{
    extend:{
     color:{
      "rabbit-red":"#ea2e0e"
     }
    }
  },
  plugins: [tailwindcss(),react()],
})
