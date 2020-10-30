// var session = require('express-session')
import colors from 'vuetify/es5/util/colors'
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { href: "https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css", rel: "stylesheet"},
      { href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons", rel: "stylesheet"},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  styleResources: {
    scss: [
      '@/assets/colors.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vuex-persist.js', ssr: false },
    { src: '~/plugins/alerts.js', ssr: false },
    { src: '~/plugins/colorManager.js', ssr: false },
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src: '~/plugins/axios.js', mode: 'client' },
    '~/plugins/vuelidate.js',
    '~/plugins/event-bus.js'
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],
  moment: {
    locales: ['fr']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/moment',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    // '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode'
  ],

  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Español'
      },
      {
        code: 'fr',
        name: 'Français'
      }
    ],
    defaultLocale: 'fr',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'fr',
    }
  },
  
  axios: {
    baseURL: process.env.NUXT_BASE_API_URL || 'http://localhost:3000/api'
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        ligth: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        }
      }
    }
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend(config, ctx) {
      
    }
  }
}
