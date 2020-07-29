/**
 * @jest-environment jsdom
 */

import Component from '@/pages/shoppinglist.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);

const factory = () =>
  mount(Component, {
    vuetify,
    attachToDocument: true,
    // localVue,
  });

describe('shoppinglist page', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
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
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
