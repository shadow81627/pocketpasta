// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import pkg from './package';

const env = {
  // HOST,
  // PORT,
  // BASE_URL,
  // API_URL,
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

export default defineNuxtConfig({
  devtools: { enabled: true },

  // experimental: {
  //   asyncContext: true,
  // },

  publicRuntimeConfig: {
    public: {
      ...env,
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    'nuxt-icon',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-lodash',
    '@unocss/nuxt',
  ],

  unocss: {
    typography: true,
    webFonts: {
      fonts: {
        sans: 'Roboto',
      },
    },
  },

  pwa: {
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
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
    domains: ['res.cloudinary.com'],
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

  sourcemap: true,

  app: {
    head: {
      script: [
        {
          innerHTML: `if (window.global === undefined) {
              window.global = window;
            }
            if (window.process === undefined) {
              window.process = {};
            }
            if (window.process.nextTick === undefined) {
              window.process.nextTick = (fn, ...args) => setTimeout(fn(...args), 0);
            }`,
        },
      ],
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [vuetify({ autoImport: true })],
  },
});
