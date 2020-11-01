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
      { name:'robots', content: 'index, follow' },
      { name: 'keywords', content: 'attestation,  attestation covid, attestation sortie, attestation sortie covid'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/colorManager.js', ssr: false },
    { src: '~/plugins/vuex-persist.js', mode: 'client' },
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src: '~/plugins/vueSignaturePad.js', mode: 'client' }
  ],
  env: {
    NUXT_CRYPTO_SECRET: process.env.NUXT_CRYPTO_SECRET,
    maxAge: 2147483647
  },

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
    'nuxt-purgecss',
    'nuxt-webfontloader',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],
  purgeCSS: {
    // enabled: true,
    mode: 'webpack',
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'node_modules/vuetify/src/**/*.js',
      'node_modules/vuetify/src/**/*.ts'
    ],
    whitelist: ['body', 'html', 'nuxt-progress'],
    extractors: [
      {
        extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js']
      }
    ]
  },
  robots: [
    {
      UserAgent: '*'
    }
  ],

  sitemap: {
    hostname: process.env.NUXT_BASE_FRONT_URL,
    gzip: true,
    routes: [
      '/'
    ]
  },
  
  axios: {
    baseURL: process.env.NUXT_BASE_API_URL || 'http://localhost:3000/api'
  },

  webfontloader: {
    google: {
      families: [
        'Open+Sans:300,400,500,700'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap'
      ]
    }
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
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

  serverMiddleware: [
    // Will register redirect-ssl npm package
    'redirect-ssl', //todo comment this line in dev mode
    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api' },
  ],

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^vuetify/, 'vuex-persist'],
    extractCSS: true,
    extend(config, ctx) {
      
    }
  }
}
