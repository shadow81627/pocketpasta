import Component from '@/pages/releases.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);

const factory = () =>
  shallowMount(Component, {
    localVue,
    vuetify,
  });

describe('releases page', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    // wrapper.setMethods({ content: () => '# aBC' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
