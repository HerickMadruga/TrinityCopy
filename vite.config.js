// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- ADICIONE ESTA LINHA ---
  // Define a URL base da aplicação para o nome do seu repositório.
  // Isso é CRUCIAL para que as imagens e outros arquivos carreguem corretamente.
  base: "/TrinityCopy/", 
})