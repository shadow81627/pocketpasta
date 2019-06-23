import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import about from '@/pages/about.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);

localVue.use(VueRouter);

const router = new VueRouter();

let getters;
let state;
let store;
let mutations;

beforeEach(() => {
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
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('head', () => {
    expect(about.head()).toBeTruthy();
  });
});
