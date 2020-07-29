import Component from '@/pages/profile.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);

const factory = () => shallowMount(Component, { localVue, vuetify });

describe('profile', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
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
