import { removeKeys } from '@/utils';
import Component from '@/components/Product/Product';
import product from '@/assets/link-data/products/tomatoes.json';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';

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
      propsData: {
        ...product,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('linkData', () => {
    const wrapper = factory();
    expect(wrapper.vm.linkData).toBeTruthy();
  });

  test('imageData with cloudinary image does not modify url', () => {
    const wrapper = factory();
    const image = 'https://res.cloudinary.com/pocketpasta/image/fetch/';
    expect(wrapper.vm.cloudinaryify(image)).toEqual(image);
  });

  test('imageData convet to cloudinaty url', () => {
    const wrapper = factory();
    expect(wrapper.vm.cloudinaryify(product.image)).toEqual(
      `https://res.cloudinary.com/pocketpasta/image/fetch/w_540,h_540,ar_1:1,c_fill,f_auto,q_auto/${product.image}`,
    );
  });

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
