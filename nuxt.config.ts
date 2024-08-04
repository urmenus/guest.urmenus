const devServer = { https: true }

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true, telemetry: false, timeline: { enabled: false } },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt',
  ],
  tailwindcss: {
    cssPath: ['@/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: '@/tailwind.config.ts',
    viewer: false,
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'theme',
  },

  icon: {
    collections: ['bx', 'bxs', 'ph'],
    mode: 'svg',
  },

  imports: {
    presets: [{ from: '@/src/constants/routing', imports: ['NUXT_LINKS'] }],
  },

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
  },
  devServer,
})
