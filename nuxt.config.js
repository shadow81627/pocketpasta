const pkg = require('./package');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const BASE_URL =
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  `http${PORT === 433 ? 's' : ''}://${HOST}:${PORT}`;

const env = {
  HOST,
  PORT,
  BASE_URL,
  VERSION: pkg.version,
  COMMIT: process.env.npm_package_gitHead,

  FIREBASE_API_KEY:
    process.env.FIREBASE_API_KEY || 'AIzaSyDG_OMeMaXVIHJqZpTzkY_DAWV9ylNwlXM',
  FIREBASE_AUTH_DOMAIN:
    process.env.FIREBASE_AUTH_DOMAIN || 'staging-pocketpasta.firebaseapp.com',
  FIREBASE_DATABASE_URL:
    process.env.FIREBASE_DATABASE_URL ||
    'https://staging-pocketpasta.firebaseio.com',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'staging-pocketpasta',
  FIREBASE_STORAGE_BUCKET:
    process.env.FIREBASE_STORAGE_BUCKET || 'staging-pocketpasta.appspot.com',
  FIREBASE_MESSAGE_SENDER_ID:
    process.env.FIREBASE_MESSAGE_SENDER_ID || '216453269763',
  FIREBASE_APP_ID:
    process.env.FIREBASE_APP_ID || '1:216453269763:web:71a3fe1ca24500bb',
};

const i18nSettings = {
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

const preconnectLinks = [
  'https://pocketpasta.com',
  'https://res.cloudinary.com',
  'https://www.google-analytics.com',
  'https://firebaseinstallations.googleapis.com',
  'https://www.google.com',
  'https://www.googletagmanager.com',
  'https://stats.g.doubleclick.net',
  'https://www.googletagmanager.com',
];

module.exports = {
  mode: 'universal',
  target: 'static',

  workbox: {
    offlineAnalytics: true,
  },

  meta: {
    lang: undefined,
    ogHost: 'https://pocketpasta.com',
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
    shortcuts: [
      {
        name: 'Shopping List',
        url: '/shoppinglist?utm_source=a2hs&utm_medium=none&standalone=true',
        icons: [{ src: '/icon.png', sizes: '512x512' }],
      },
    ],
  },

  icon: {
    sizes: [16, 32, 36, 48, 64, 72, 96, 120, 144, 152, 180, 192, 200, 384, 512],
  },

  router: {
    linkActiveClass: 'active',
    middleware: [],
  },

  publicRuntimeConfig: {
    ...env,
  },

  server: {
    timing: {
      total: true,
    },
  },

  render: {
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles.map(
          (f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`,
        ),
    },
  },

  /*
   ** Headers of the page
   */
  head: {
    // htmlAttrs: { 'data-vue-meta-server-rendered': '' },
    titleTemplate: (titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} | PocketPasta` : 'PocketPasta';
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
        property: 'og:title',
        template: (titleChunk) => {
          // If undefined or blank then we don't need the hyphen
          return titleChunk ? `${titleChunk} - PocketPasta` : 'PocketPasta';
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
    exclude: ['/shoppinglist', 'tasks'],
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
  css: ['~/assets/scss/custom.scss', '~/assets/css/custom.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/theme.js', mode: 'client' }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/eslint-module',
    '@nuxtjs/firebase',
    '@nuxtjs/google-analytics',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
    '@nuxtjs/sentry',
    'bootstrap-vue/nuxt',
    ['nuxt-i18n', i18nSettings],

    // keep sitemap last
    '@nuxtjs/sitemap',
  ],

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/color-mode',
    '@nuxtjs/netlify-files',
  ],

  dotenv: {
    systemvars: true,
  },

  eslint: {
    /* module options */
    cache: true,
  },

  recaptcha: {
    // Hide badge element (v3)
    hideBadge: true,
    // Site key for requests
    siteKey: '6LdQk5wUAAAAACVF6pTOxBSQ50_ZcNJ8EM94hBYc',
    version: 3,
  },

  auth: {
    // cookie: false,
    resetOnError: true,
    defaultStrategy: 'custom',
    strategies: {
      custom: {
        _scheme: '~/plugins/customStrategy.js',
        // endpoints: {
        //   login: {
        //     url: '/api/auth/login',
        //     method: 'post',
        //     propertyName: 'token',
        //   },
        //   logout: { url: '/api/auth/logout', method: 'post' },
        //   user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
        // },
      },
      auth0: {
        domain: 'pocketpasta.auth0.com',
        client_id: 'SU9fkdMw6bqMkqwEZ2pX7sk3SlxR3Qi8',
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/profile',
      home: '/profile',
    },
  },

  firebase: {
    config: {
      apiKey:
        process.env.FIREBASE_API_KEY ||
        'AIzaSyDG_OMeMaXVIHJqZpTzkY_DAWV9ylNwlXM',
      authDomain:
        process.env.FIREBASE_AUTH_DOMAIN ||
        'staging-pocketpasta.firebaseapp.com',
      databaseURL:
        process.env.FIREBASE_DATABASE_URL ||
        'https://staging-pocketpasta.firebaseio.com',
      projectId: process.env.FIREBASE_PROJECT_ID || 'staging-pocketpasta',
      storageBucket:
        process.env.FIREBASE_STORAGE_BUCKET ||
        'staging-pocketpasta.appspot.com',
      measurementId: 'G-M7TXCJEKSQ',
      messagingSenderId:
        process.env.FIREBASE_MESSAGE_SENDER_ID || '216453269763',
      appId:
        process.env.FIREBASE_APP_ID || '1:216453269763:web:71a3fe1ca24500bb',
    },
    onFirebaseHosting: process.env.FIREBASE_HOSTING || false,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedMutation: 'setUser',
          onAuthStateChangedAction: 'setUser',
        },
      },
      firestore: { enablePersistence: true },
      performance: true,
      analytics: true,
      // messaging: {
      //   createServiceWorker: true,
      //   onFirebaseHosting: true,
      // },
    },
  },

  vuetify: {
    optionsPath: './vuetify.options.js',
    // customVariables: ['~/assets/scss/vuetify.scss'],
    treeShake: true,
    theme: { disable: true },
    defaultAssets: false,
  },

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false, // or `bvCSS`
    componentPlugins: [
      'Image',
      'FormSelect',
      'Card',
      'ButtonPlugin',
      'FormTextareaPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
    ],
    directivePlugins: ['Tooltip'],
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
  },

  sitemap: {
    hostname: BASE_URL,
    gzip: true,
    xslUrl: '/sitemap.xsl',
    defaults: {
      changefreq: 'weekly',
      // priority: 0.5,
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

  /*
   ** Build configuration
   */
  build: {
    // move component styles into css files
    extractCSS: true,
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
