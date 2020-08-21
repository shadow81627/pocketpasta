import { config } from '@vue/test-utils';

import MutationObserver from 'mutation-observer';

config.mocks.$t = (msg) => msg;

config.mocks.$i18n = {
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

config.mocks.$pouch = {
  changes: () => ({ on: () => ({}) }),
  post: () => ({}),
  put: () => ({}),
  upsert: () => ({}),
  find: () => ({ docs: [] }),
};

config.mocks.$auth = { user: {} };
config.mocks.$fetchState = {};

config.mocks.localePath = (route) => route;

config.mocks.switchLocalePath = (lang) => lang;

config.mocks.$icon = (size) => size;

global.MutationObserver = MutationObserver;

// theme selector
config.mocks.$colorMode = { preference: null, value: null };

config.showDeprecationWarnings = false;
config.stubs['client-only'] = '<span><slot /></span>';
