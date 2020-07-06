import Page from '@/pages/products/_id/index.vue';
import spaghetti from '@/assets/link-data/recipes/spaghetti.json';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Vue from 'vue';

import { removeKeys } from '@/utils';

const recipe = removeKeys(spaghetti, ['@type', '@context']);

const localVue = createLocalVue();

localVue.use(Vuex);
Vue.use(Vuetify);
localVue.use(VueRouter);
localVue.use(VueMeta, { keyName: 'head' });

const router = new VueRouter();

let getters;
let state;
let store;
let mutations;
let vuetify;

const $route = {
  get() {
    return {
      path: '/recipes/detail/1',
      params: { id: '1' },
      fullPath: '/recipes/detail/1',
      name: 'recipes-detail-id',
    };
  },
  set() {},
};

beforeEach(() => {
  vuetify = new Vuetify();
  state = {
    recipes: [{ ...recipe, id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };

  getters = {
    getRecipeById: (state) => (id) =>
      state.recipes.find((recipe) => recipe.id === id),
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
  shallowMount(Page, {
    store,
    router,
    vuetify,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    mocks: { $route },
    localVue,
  });

describe('product detail', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('fetch', () => {
    const wrapper = factory();
    expect(wrapper.vm.$options.asyncData()).toBeTruthy();
  });

  test('head', () => {
    const wrapper = factory();
    expect(wrapper.vm.$metaInfo).toBeTruthy();
  });
});
