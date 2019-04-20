import VueTestUtils from '@vue/test-utils';

VueTestUtils.config.mocks.$t = (msg) => msg;

VueTestUtils.config.mocks.$i18n = {
  locale: 'en',
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

VueTestUtils.config.mocks.$icon = (size) => size;
