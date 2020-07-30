import Component from '@/pages/offers.vue';
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

describe('offers page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('name', () => {
    const wrapper = factory();
    expect(wrapper.vm.name([{ dir: '/test/something' }])).toBeTruthy();
  });

  test('offerData', () => {
    const wrapper = factory();
    expect(wrapper.vm.offerData([])).toBeTruthy();
  });

  test('fetch', () => {
    const wrapper = factory();
    expect(wrapper.vm.$options.fetch()).toBeTruthy();
    expect(wrapper.vm.$data.list).toEqual([]);
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
