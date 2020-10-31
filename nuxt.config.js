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
      { name:'google-site-verification', content: 'J4ZsRyYu2RLNP8Z1jPHbt7ciae42OXVDNUPTFrm8iSo' },
      { hid: 'Générez votre attestation de sortie une bonne fois pour toute', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { href: "https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css", rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'"},
      { href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700",rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'"},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vuex-persist.js', ssr: false },
    { src: '~/plugins/colorManager.js', ssr: false },
    { src: '~/plugins/vuetify.js', mode: 'client' }
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
    '@nuxtjs/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  robots: [
    {
      UserAgent: '*'
    }
  ],

  sitemap: {
    hostname: 'http://cococertif.com/',
    gzip: true,
    routes: [
      '/'
    ]
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
    transpile: [/^vuetify/],
    extractCSS: true,
    extend(config, ctx) {
      
    }
  }
}
