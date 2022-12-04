const pkg = require('./package');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  process.env.CF_PAGES_URL ||
  `http${PORT === 433 ? 's' : ''}://${HOST}${
    [433, 80].includes(PORT) ? '' : `:${PORT}`
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (_, protocol, domain) {
  return `${protocol || 'https'}://${domain}`;
});
const API_URL = process.env.API_URL || 'https://api.pocketpasta.com';

const env = {
  HOST,
  PORT,
  BASE_URL,
  API_URL,
  VERSION: pkg.version,
  COMMIT:
    process.env.npm_package_gitHead || process.env.VERCEL_GITHUB_COMMIT_SHA,
  DATE_GENERATED: new Date().toISOString(),

  CLOUDINARY_NAME: 'pocketpasta',
  IMAGE_PROVIDER: 'cloudinary',
  SENTRY_DSN:
    process.env.SENTRY_DSN ||
    'https://46d059ea02a240dfbb89bfaa4926f463@sentry.io/1411042',

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
    runtimeCaching: [
      {
        urlPattern: 'https://res.cloudinary.com/.*',
        handler: 'CacheFirst',
      },
    ],
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
    { src: '~/plugins/theme.js', mode: 'client' },
    // { src: '~/middleware/last-known-route', mode: 'client' },
    // { src: '~/plugins/db.js', mode: 'client' },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/google-analytics',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@dansmaculotte/nuxt-security',
    'vue-warehouse/nuxt',
    'nuxt-i18n',

    // keep sitemap last
    '@nuxtjs/sitemap',
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/color-mode',
    '@nuxt/image',
  ],

  components: ['~/components'],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: env.API_URL,
      },
    },
  },

  eslint: {
    /* module options */
    cache: true,
  },

  image: {
    provider: env.IMAGE_PROVIDER,
    providers: {
      cloudinary_upload: {
        provider: 'cloudinary',
        options: {
          baseURL: `https://res.cloudinary.com/${env.CLOUDINARY_NAME}/image/upload/`,
        },
      },
    },
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${env.CLOUDINARY_NAME}/image/fetch/`,
      options: {
        quality: 'auto',
        format: 'auto',
        dpr: 'auto',
      },
    },
    screens: {
      placeholder: 10,
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    domains: [env.HOST, 'res.cloudinary.com'],
    presets: {
      hero: {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          quality: 'auto',
          format: 'auto',
          dpr: 'auto',
          // ar: '16:9',
          // c: 'fill',
        },
      },
      og: {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          quality: 'auto',
          format: 'auto',
          dpr: 'auto',
          // height: 630,
          width: 1280,
          c: 'fill',
        },
      },
      placeholder: {
        modifiers: {
          quality: 'auto',
          format: 'auto',
          dpr: 'auto',
          width: 10,
        },
      },
    },
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
    dsn: env.SENTRY_DSN,
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

  security: {
    hsts: {
      maxAge: 15552000,
      includeSubDomains: true,
      preload: true,
    },
    csp: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'self'"],
      },
      reportOnly: false,
    },
    referrer: 'same-origin',
    securityFile: {
      contacts: ['mailto:damien.robinson@pocketpasta.com'],
      canonical: 'https://pocketpasta.com/.well-know/security.txt',
      preferredLanguages: ['en'],
    },
    additionalHeaders: true,
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    credentials: true,
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
    transpile: ['lodash-es', 'vuetify/lib', 'vee-validate/dist/rules'],
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map';
      }
    },
  },
};
