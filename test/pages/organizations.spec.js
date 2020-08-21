import Component from '@/pages/organizations.vue';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter();

let vuetify;

beforeEach(() => {
  vuetify = new Vuetify();
});

const factory = () =>
  shallowMount(Component, {
    router,
    vuetify,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('organizations page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
