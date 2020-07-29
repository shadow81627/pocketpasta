import Vue from 'vue';
// import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import 'tiptap-vuetify/dist/main.css';

export default async ({ app }) => {
  const TiptapVuetifyPlugin = (
    await import(/* webpackChunkName: "tiptap" */ 'tiptap-vuetify')
  ).TiptapVuetifyPlugin;

  Vue.use(TiptapVuetifyPlugin, {
    vuetify: app.vuetify,
    iconsGroup: 'mdiSvg',
  });
};
