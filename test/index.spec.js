// const assert = require('assert');

// describe('pocketpasta.com page', () => {
//   it('should have the right title', () => {
//     browser.url('https://pocketpasta.com');
//     const title = browser.getTitle();
//     assert.strict.equal(title, 'pocketpasta');
//   });
// });

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import index from '@/pages/index.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);

const factory = () =>
  shallowMount(index, {
    localVue,
    propsData: {
      label: 'Job Title',
      value: 'Full Stack Web Developer',
    },
  });

describe('index', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(index.head()).toBeTruthy();
  });
});
