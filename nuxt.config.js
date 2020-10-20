const pkg = require('./package');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  `http${PORT === 433 ? 's' : ''}://${HOST}${
    [433, 80].includes(PORT) ? '' : `:${PORT}`
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (
  _,
  protocol = 'https',
  domain,
) {
  return `${protocol}://${domain}`;
});

const env = {
  HOST,
  PORT,
  BASE_URL,
  VERSION: pkg.version,
  COMMIT:
    process.env.npm_package_gitHead ||
    process.env.TRAVIS_COMMIT ||
    process.env.VERCEL_GITHUB_COMMIT_SHA,
  DATE_GENERATED: new Date().toISOString(),

  DB_REMOTE: process.env.DB_REMOTE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

const preconnectLinks = [
  'https://pocketpasta.com',
  'https://res.cloudinary.com',
  'https://www.google-analytics.com',
  'https://www.google.com',
  'https://www.googletagmanager.com',
  'https://stats.g.doubleclick.net',
  'https://www.googletagmanager.com',
];

module.exports = {
  srr: true,
  target: 'static',

  workbox: {
    offlineAnalytics: true,
    dev: false,
  },

  meta: {
    lang: undefined,
    ogHost: BASE_URL,
  },

  manifest: {
    name: 'PocketPasta',
    short_name: 'PocketPasta',
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

  publicRuntimeConfig: {
    ...env,
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk && titleChunk !== 'PocketPasta'
        ? `${titleChunk} | PocketPasta`
        : 'PocketPasta';
    },
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.',
        once: true,
        hid: 'noscript',
      },
    ],
    meta: [
      {
        once: true,
        name: 'charset',
        hid: 'charset',
        content: 'utf-8',
      },
      {
        property: 'og:title',
        title: 'PocketPasta',
        template: (titleChunk) => {
          return titleChunk && titleChunk !== 'PocketPasta'
            ? `${titleChunk} | PocketPasta`
            : 'PocketPasta';
        },
        hid: 'og:title',
      },
      {
        hid: 'google-site-verification',
        once: true,
        name: 'google-site-verification',
        content: 'LqVnUnYGR8NrvXrhnFgW5RjNJVChZp2j2OEP55xjE30',
      },
      {
        once: true,
        name: 'version',
        hid: 'version',
        content: pkg.version,
      },
      {
        once: true,
        'http-equiv': 'Accept-CH',
        hid: 'Accept-CH',
        content: 'DPR, Viewport-Width, Width',
      },
    ],
    link: [
      {
        once: true,
        rel: 'icon',
        hid: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      ...preconnectLinks.map((href) => ({
        rel: 'preconnect',
        href,
        hid: `preconnect-${href}`,
        crossorigin: 'anonymous',
        once: true,
      })),
    ],
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: true,
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#4DBA87',
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/app.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: '~/plugins/theme.js', mode: 'client' },
    // { src: '~/middleware/last-known-route', mode: 'client' },
    // { src: '~/plugins/db.js', mode: 'client' },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    'vue-warehouse/nuxt',
    'nuxt-i18n',

    // keep sitemap last
    '@nuxtjs/sitemap',
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/color-mode',
  ],

  eslint: {
    /* module options */
    cache: true,
  },

  vuetify: {
    optionsPath: './vuetify.options.js',
    treeShake: true,
    defaultAssets: false,
  },

  googleAnalytics: {
    id: 'UA-125711214-1',
    dev: false,
  },

  sentry: {
    // Enter your project's DSN here
    dsn: 'https://46d059ea02a240dfbb89bfaa4926f463@sentry.io/1411042',
    // enable sentry-webpack-plugin used to send releases to Sentry
    // publishRelease: true,
    disabled: process.env.NODE_ENV !== 'production',
    lazy: true,
  },

  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    i18n: 'en',
    xslUrl: '/sitemap.xsl',
    defaults: {
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date(),
      // lastmodrealtime: true,
    },
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    https: true,
  },

  content: {
    // Only search in title and description
    fullTextSearchFields: ['name', 'description', 'keywords'],
  },

  i18n: {
    baseUrl: BASE_URL,
    seo: false,
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
    ],
    lazy: true,
    langDir: 'lang/',
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['lodash-es', 'vuetify/lib'],
  },
};
