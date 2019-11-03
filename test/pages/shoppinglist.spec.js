/**
 * @jest-environment jsdom
 */

import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Component from '@/pages/shoppinglist.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () =>
  mount(Component, {
    attachToDocument: true,
    // localVue,
  });

describe('shoppinglist page', () => {
  beforeEach(() => {
    document.getSelection = () => {
      return {
        removeAllRanges: () => {},
        getNativeRange: () => {},
        getRangeAt: () => {},
      };
    };
  });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
