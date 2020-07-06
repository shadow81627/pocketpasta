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
  theme: {
    themes: {
      light: {
        // orange: '#e0611d'
        // primary: '#4DBA87',
        /*
          My text color is #4FBA88 at 14 px and regular weight
          My background color is #F5F5F5
          My design must be AAA compliant
          https://accessible-colors.com/
         */
        primary: '#255D43',
        /*
          My text color is #4FBA87 at 14 px and regular weight
          My background color is #F5F5F5
          My design must be AA compliant
          https://accessible-colors.com/
         */
        // primary: '#317E5A',
        // primary: '#e0611d',
        // primary: '#8A3C12',
      },
      dark: {
        // primary: '#4DBA87',
        /**
          My text color is #4FBA88 at 14px and regular weight
          My background color is #F5F5F5
          My design must be AAA compliant
          https://accessible-colors.com/
        */
        primary: '#67C498',
      },
    },
  },
};
