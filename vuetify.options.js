import {
  mdiEmail,
  mdiBook,
  mdiStore,
  mdiText,
  mdiCogOutline,
  mdiPaletteSwatch,
  mdiWeb,
  mdiTranslate,
  mdiRun,
  mdiAccountCircle,
  mdiMapMarker,
  mdiViewList,
  mdiViewComfy,
  mdiDownload,
  mdiCalendarCheck,
} from '@mdi/js';

// vuetify.options.js
export default {
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      email: mdiEmail,
      book: mdiBook,
      store: mdiStore,
      notes: mdiText,
      settings: mdiCogOutline,
      style: mdiPaletteSwatch,
      language: mdiWeb,
      translate: mdiTranslate,
      run: mdiRun,
      account_circle: mdiAccountCircle,
      place: mdiMapMarker,
      list: mdiViewList,
      view_comfy: mdiViewComfy,
      get_app: mdiDownload,
      'calendar-check': mdiCalendarCheck,
    },
  },
  // lang: {},
  // rtl: true,
  theme: { disable: true },
};
