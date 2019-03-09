const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      amp: '',
    },
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
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-125711214-1',
        async: '',
        defer: '',
      },
      {
        async: '',
        src: 'https://cdn.ampproject.org/v0.js',
      },
    ],
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: false,
    routes: ['/', '/about', '/newsletter'],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Add google analytics
    {
      src: '~plugins/ga.js',
      ssr: false,
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/sentry',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  sentry: {
    // Enter your project's DSN here
    dsn: 'https://46d059ea02a240dfbb89bfaa4926f463@sentry.io/1411042',
    // Additional config
    config: {
      // enable sentry-webpack-plugin used to send releases to Sentry
      publishRelease: true,
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
