import Recipe from '@/components/Recipe/Recipe';
import recipe from '@/content/recipes/1.json';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueMeta from 'vue-meta';
// import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);
// localVue.use(VueRouter);
localVue.use(BootstrapVuePlugin);
localVue.use(VueMeta, {
  keyName: 'head',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'hid',
  refreshOnceOnNavigation: true,
});

// const router = new VueRouter();

const $route = {
  path: '/recipes/1',
  params: { id: '1' },
  fullPath: '/recipes/1',
  name: 'recipes-detail-id',
};

describe('Recipe', () => {
  let getters;
  let state;
  let store;
  let mutations;
  let vuetify;

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
    shallowMount(Recipe, {
      store,
      // router,
      localVue,
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $route,
      },
      propData: recipe,
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('imageData with cloudinary image does not modify url', () => {
    const wrapper = factory();
    const image = 'https://res.cloudinary.com/pocketpasta/image/fetch/';
    wrapper.setProps({
      ...recipe,
      image,
    });
    expect(wrapper.vm.imageData).toBeTruthy();
  });

  test('imageData convet to cloudinaty url', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
    });
    expect(wrapper.vm.imageData).toBeTruthy();
  });

  test('imageData handle array', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
      image: ['https://res.cloudinary.com/pocketpasta/image/fetch/'],
    });
    expect(wrapper.vm.imageData).toBeTruthy();
  });

  test('truncate', () => {
    const wrapper = factory();
    const text = `${'a'.repeat(151)}`;
    expect(wrapper.vm.truncate(text)).toEqual(`${'a'.repeat(150)}...`);
  });

  test('head', () => {
    const wrapper = factory();
    expect(wrapper.vm.$metaInfo).toBeTruthy();
  });
});
