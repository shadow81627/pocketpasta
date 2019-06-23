import { shallowMount, createLocalVue } from '@vue/test-utils';
import Recipe from '@/components/Recipe/Recipe';
import Vuex from 'vuex';
// import VueRouter from 'vue-router';

import recipe from '@/assets/link-data/recipes/spaghetti.json';

const localVue = createLocalVue();

localVue.use(Vuex);
// localVue.use(VueRouter);

// const router = new VueRouter();

const $route = {
  path: '/recipes/detail/1',
  params: { id: '1' },
  fullPath: '/recipes/detail/1',
  name: 'recipes-detail-id',
};

describe('Recipe', () => {
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
    shallowMount(Recipe, {
      store,
      // router,
      localVue,
      mocks: {
        $route,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(Recipe.head()).toBeTruthy();
  });
});
