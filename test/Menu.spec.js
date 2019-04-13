import { shallowMount, createLocalVue } from '@vue/test-utils';
import Component from '@/components/User/Menu';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Recipe', () => {
  let getters;
  let state;
  let store;
  let mutations;

  beforeEach(() => {
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
    shallowMount(Component, {
      store,
      localVue,
      mocks: {
        $auth: {
          loggedIn: () => true,
          user: {
            sub: '',
            nickname: 'damien.robinson',
            name: 'damien.robinson@pocketpasta.com',
            picture:
              'https://s.gravatar.com/avatar/79fbbc24ccdcbed0a7408da53bb32c49?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fod.png',
            updated_at: '2019-04-12T22:15:31.966Z',
            email: 'damien.robinson@pocketpasta.com',
            email_verified: false,
          },
        },
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
});
