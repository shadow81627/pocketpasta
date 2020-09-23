import recipes from '@/pages/search.vue';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();

localVue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter();
let vuetify;

const factory = () =>
  shallowMount(recipes, {
    vuetify,
    mocks: {
      $fetchState: {},
    },
    router,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('recipes', () => {
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

  // test('head', () => {
  //   expect(recipes.head()).toBeTruthy();
  // });
});
