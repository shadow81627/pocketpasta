import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import { removeKeys } from '@/utils';
import Component from '@/components/Product/Product';

import product from '@/assets/link-data/products/tomatoes.json';

// JSDOM complains about this attribute
removeKeys(product, ['@type']);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);

const $route = {
  path: '/products/detail/1',
  params: { id: '1' },
  fullPath: '/products/detail/1',
  name: 'products-detail-id',
};

describe('Product', () => {
  let getters;
  let state;
  let store;
  let mutations;

  beforeEach(() => {
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
    expect(Component.head()).toBeTruthy();
  });
});
