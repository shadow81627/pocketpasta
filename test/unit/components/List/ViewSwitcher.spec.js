import Component from '@/components/List/ViewSwitcher';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

localVue.use(Vuex);

Vue.use(Vuetify);

describe('ViewSwitcher', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Component, {
      localVue,
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('currentLayout', () => {
    const wrapper = factory();
    expect(wrapper.vm.currentLayout).toBeTruthy();
  });

  test('availableLayouts', () => {
    const wrapper = factory();
    expect(wrapper.vm.availableLayouts).toBeTruthy();
  });

  test('inputListeners', () => {
    const wrapper = factory();
    expect(wrapper.vm.inputListeners).toBeTruthy();
  });
});
