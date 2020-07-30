import Component from '@/pages/products/index.vue';
import productData from '@/assets/link-data/products/tomatoes.json';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();

const product = delete productData['@context'];

localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter();

let getters;
let state;
let store;
let mutations;
let vuetify;

beforeEach(() => {
  vuetify = new Vuetify();
  state = {
    products: [{ ...product, id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };

  getters = {
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
  };

  mutations = {
    setTheme(currentState, theme) {
      currentState.theme = theme;
    },
  };

  store = new Vuex.Store({
    state,
    getters,
    mutations,
  });
});

const factory = () =>
  shallowMount(Component, {
    store,
    router,
    vuetify,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('products page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
