// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["nuxt-icon"],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [vuetify({ autoImport: true })],
  },
});
