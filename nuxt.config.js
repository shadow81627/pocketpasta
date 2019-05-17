const pkg = require('./package');

const routes = [
  '/',
  '/about',
  '/newsletter',
  '/settings',
  '/recipes',
  '/recipes/1',
  '/recipes/2',
];

const i18nSettings = {
  baseUrl: 'https://pocketpasta.com',
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en-US.js',
    },
    {
      code: 'fr',
      name: 'Français',
      iso: 'fr-FR',
      file: 'fr-FR.js',
    },
  ],
  lazy: true,
  langDir: 'lang/',
};

module.exports = {
  mode: 'spa',

  workbox: {
    offlineAnalytics: true,
  },

  manifest: {
    name: pkg.name,
    short_name: 'pocketpasta',
    description: pkg.description,
    start_url: '/?utm_source=a2hs&utm_medium=none&standalone=true',
    scope: '/',
    display: 'standalone',
    background_color: '#4DBA87',
    theme_color: '#4DBA87',
  },

  icon: {
    sizes: [16, 32, 36, 48, 64, 72, 96, 120, 144, 152, 180, 192, 200, 384, 512],
  },

  router: {
    linkActiveClass: 'active',
    middleware: ['theme'],
  },

  env: {
    VERSION: pkg.version,
  },

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { 'data-vue-meta-server-rendered': '' },
    title: 'PocketPasta',
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
      {
        name: 'version',
        content: pkg.version,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://pocketpasta.auth0.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://stackpath.bootstrapcdn.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://stats.g.doubleclick.net',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://www.google.com.au',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://www.google.com',
        crossorigin: 'anonymous',
      },
    ],
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: true,
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
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/quicklink', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sentry',
    '@nuxtjs/vuetify',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', i18nSettings],
    'nuxt-webfontloader',

    // keep sitemap last
    '@nuxtjs/sitemap',
  ],

  recaptcha: {
    // Hide badge element (v3)
    hideBadge: true,
    // Site key for requests
    siteKey: '6LdQk5wUAAAAACVF6pTOxBSQ50_ZcNJ8EM94hBYc',
    version: 3,
  },

  auth: {
    resetOnError: true,
    strategies: {
      auth0: {
        domain: 'pocketpasta.auth0.com',
        client_id: 'SU9fkdMw6bqMkqwEZ2pX7sk3SlxR3Qi8',
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login/',
      home: '/',
    },
  },

  vuetify: {
    treeShake: true,
    theme: false,
    // iconfont: 'md',
  },

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: true, // or `bvCSS`
    componentPlugins: ['Image', 'FormSelect', 'Card'],
    directivePlugins: ['Tooltip'],
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
  },

  webfontloader: {
    custom: {
      families: ['Comic Neue'],
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
    // move component styles into css files
    // extractCSS: true,
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
