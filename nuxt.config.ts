import { devServer } from './.temp/dev'

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
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@hypernym/nuxt-gsap',
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
  runtimeConfig: {
    public: {
      nestUrl: '',
      baseUrl: process.env.BASE_URL || 'https://localhost:3000',
      buildData: new Date().toISOString(),
    },
  },

  vite: { optimizeDeps: { exclude: ['vee-validate'] } },
  routeRules: {
    '/profile': { ssr: false },
  },
  i18n: {
    vueI18n: '@/i18n.config.ts',
    lazy: true,
    langDir: 'src/i18n',
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    dynamicRouteParams: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'un_i18n',
      // redirectOn: 'root', // recommended
      cookieCrossOrigin: true,
    },
    locales: [{ code: 'ru', name: 'Русский', iso: 'ru_RU', file: 'ru_RU.ts' }],
  },

  devServer,
})
