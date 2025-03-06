import tailwindcss from "@tailwindcss/vite";

import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: "src/",
  devtools: { enabled: true },
  css: ['./src/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
     '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
        ripple: true,
        inputVariant: 'filled',
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false
            }
        }
    }
},
nitro: {
  routeRules: {
    "/api/**": { cors: true }, // Enables CORS for API routes
  },
},
})