import type { Config } from 'tailwindcss'

import type { Theme } from '@/types'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

const dark: Theme = {
  ...themes.dark,
  primary: '#ae4c7d',
  'primary-content': '#ffffff',
  'base-100': '#191919',
  'base-200': '#232323',
  'base-300': '#0a0a0a',
}

const light: Theme = {
  ...themes.light,
  primary: '#ae4c7d',
  'primary-content': '#ffffff',
  'base-100': '#ffffff',
  'base-200': '#f5f5f5',
  'base-300': '#ecedf0',
}

const config: Config = {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue', './error.vue'],
  darkMode: ['class', 'data-theme'],
  theme: {},
  plugins: [daisyui],
  daisyui: {
    themes: [{ dark, light }],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}

export default config
