import { fileURLToPath, URL} from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

require('dotenv').config()
 


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [vue({
    template: {
      transformAssetUrls: {
        includeAbsolute: true,
      },
    }
  }),
  basicSsl()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    }
  }
})