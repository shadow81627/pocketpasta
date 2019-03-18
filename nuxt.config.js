const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const pkg = require('./package');

module.exports = {
  mode: 'universal',

  manifest: {
    name: pkg.name,
    short_name: 'pocketpasta',
    description: pkg.description,
    icons: [
      {
        src: '/images/icons/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-270x270.png',
        sizes: '270x270',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-588x270.png',
        sizes: '588x270',
        type: 'image/png',
      },
      {
        src: '/images/icons/icon-588x588.png',
        sizes: '588x588',
        type: 'image/png',
      },
    ],
    start_url: '/?utm_source=a2hs',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#4DBA87',
  },

  router: {
    linkActiveClass: 'active',
  },

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { 'data-vue-meta-server-rendered': '' },
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
      {
        name: 'google-site-verification',
        content: 'LqVnUnYGR8NrvXrhnFgW5RjNJVChZp2j2OEP55xjE30',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: false,
    routes: ['/', '/about', '/newsletter', '/recipes', '/recipes/detail/1'],
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: {
  //   color: '#000',
  // },
  // Disable loading bar since AMP will not generate a dynamic page
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    'bootstrap-vue/nuxt',
  ],

  googleAnalytics: {
    id: 'UA-125711214-1',
    dev: false,
  },

  sentry: {
    // Enter your project's DSN here
    dsn: 'https://46d059ea02a240dfbb89bfaa4926f463@sentry.io/1411042',
    // Additional config
    config: {
      // enable sentry-webpack-plugin used to send releases to Sentry
      publishRelease: true,
      disabled: process.env.NODE_ENV !== 'production',
    },
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl'],
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
