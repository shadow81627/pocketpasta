import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import recipeDetial from '@/pages/recipes/_id/index.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import spaghetti from '@/assets/link-data/recipes/spaghetti.json';

const localVue = createLocalVue();

localVue.use(Vuex);

localVue.use(VueRouter);

const router = new VueRouter();

let getters;
let state;
let store;
let mutations;

beforeEach(() => {
  state = {
    recipes: [{ ...spaghetti, id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
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
  shallowMount(recipeDetial, {
    store,
    router,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
    localVue,
  });

describe('recipeDetial', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('head', () => {
    expect(recipeDetial.head()).toBeTruthy();
  });
});
