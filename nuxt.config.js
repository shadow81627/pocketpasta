const pkg = require('./package');

const routes = [
  '/',
  '/about',
  '/newsletter',
  '/settings',
  '/recipes',
  '/recipes/detail/1',
  '/recipes/detail/2',
];

module.exports = {
  mode: 'universal',

  manifest: {
    name: pkg.name,
    short_name: 'pocketpasta',
    description: pkg.description,
    start_url: '/?utm_source=a2hs&standalone=true',
    scope: '/',
    display: 'standalone',
    background_color: '#4DBA87',
    theme_color: '#4DBA87',
  },

  icon: {
    sizes: [16, 32, 36, 48, 64, 72, 96, 120, 144, 152, 180, 192, 384, 512],
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
        content: 'width=device-width, initial-scale=1, minimal-ui',
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
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: false,
    routes,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#4DBA87',
  },
  // Disable loading bar since AMP will not generate a dynamic page
  // loading: false,

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@nuxtjs/sitemap',
    '@nuxtjs/vuetify',
    'bootstrap-vue/nuxt',
  ],

  vuetify: {
    treeShake: true,
    theme: false,
    // iconfont: 'md',
  },

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

  sitemap: {
    hostname: 'https://pocketpasta.com',
    routes,
    gzip: true,
    generate: true, // Enable me when using nuxt generate
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
