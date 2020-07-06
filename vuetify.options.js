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
  mdiDownload,
  mdiCalendarCheck,
} from '@mdi/js';

// vuetify.options.js
export default {
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
      get_app: mdiDownload,
      'calendar-check': mdiCalendarCheck,
    },
  },
  // lang: {},
  // rtl: true,
  // theme: { disable: true },
};
