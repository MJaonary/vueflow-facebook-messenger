import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// A Simple way to import SVG into the template with vite
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
})
