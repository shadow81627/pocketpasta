import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import recipes from '@/pages/recipes/index.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import BootstrapVue from 'bootstrap-vue';

import spaghetti from '@/assets/link-data/recipes/spaghetti.json';

const localVue = createLocalVue();

const recipe = delete spaghetti['@context'];

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Vuetify);
localVue.use(BootstrapVue);

const router = new VueRouter();

let getters;
let state;
let store;
let mutations;

beforeEach(() => {
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
  shallowMount(recipes, {
    store,
    router,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('recipes', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // test('has links', () => {
  //   const wrapper = factory();
  //   expect(wrapper.find(RouterLinkStub).props().to).toBe('/subscribe');
  // });

  test('head', () => {
    expect(recipes.head()).toBeTruthy();
  });
});
