import { NuxtConfig } from '@nuxt/types';

export default {
  server: {
    port: 5023,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Le BOUTON d\'Axsiow',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,700;0,900;1,200;1,300;1,400;1,700;1,900&display=swap' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  toast: {
    duration: 5000,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    browserBaseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5023' : ('http://' + process.env.AXSIOWHOST),
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:5023/axsiow-btn' : 'http://localhost:5023',
    progress: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    base: process.env.NODE_ENV === 'production' ? '/axsiow-btn/' : '/',
  },

  // Middleware for proxying API calls + login
  serverMiddleware: [
    '~/server/initSession.ts',
    { path: '/api', handler: '~/server/index.ts' },
  ],
} as NuxtConfig;
