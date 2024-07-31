import { devServer } from './.temp/dev'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true, telemetry: false, timeline: { enabled: false } },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/color-mode'],
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
    collections: ['bx'],
    mode: 'svg',
  },
  devServer,
})
