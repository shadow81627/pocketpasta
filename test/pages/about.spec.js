import about from '@/pages/about.vue';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);
localVue.use(VueRouter);

let vuetify;
const router = new VueRouter();

let getters;
let state;
let store;
let mutations;

beforeEach(() => {
  vuetify = new Vuetify();

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
  shallowMount(about, {
    vuetify,
    store,
    router,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('about', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('head', () => {
    expect(about.head()).toBeTruthy();
  });
});
