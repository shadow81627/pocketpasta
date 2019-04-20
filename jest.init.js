import VueTestUtils from '@vue/test-utils';
import translations from '@/lang/en-US.js';

VueTestUtils.config.mocks.$t = (msg) => translations[msg];

VueTestUtils.config.mocks.$i18n = {
  locales: [
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en-US.js',
    },
  ],
};

VueTestUtils.config.mocks.localePath = (route) => route;

VueTestUtils.config.mocks.switchLocalePath = (lang) => lang;
