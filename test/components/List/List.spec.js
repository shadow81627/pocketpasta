import Component from '@/components/List/List';
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

const router = new VueRouter();

describe('List', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Component, {
      localVue,
      router,
      vuetify,
      mocks: {
        $fetchState: {},
        process: {
          browser: true,
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('fetch', () => {
    const wrapper = factory();
    expect(wrapper.vm.$options.fetch()).toBeTruthy();
    expect(wrapper.vm.$data.total).toBe(null);
    expect(wrapper.vm.$data.list).toBeTruthy();
    expect(wrapper.vm.$options.fetchOnServer()).toBeTruthy();
  });

  test('linkGen', () => {
    const defualtQuery = {
      direction: undefined,
      limit: undefined,
      page: undefined,
      reset: true,
      search: undefined,
      sortBy: undefined,
      view: undefined,
    };
    const wrapper = factory();
    expect(wrapper.vm.linkGen(1)).toEqual({
      query: defualtQuery,
    });
    expect(wrapper.vm.linkGen(2)).toEqual({
      query: { ...defualtQuery, page: 2 },
    });
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('pages', () => {
    const wrapper = factory();
    wrapper.vm.pages = 1;
    expect(wrapper.vm.pages).toEqual(1);
  });

  test('page', () => {
    const wrapper = factory();
    wrapper.vm.page = 1;
    expect(wrapper.vm.page).toEqual(1);
  });

  test('limit', () => {
    const wrapper = factory();
    wrapper.vm.limit = 1;
    expect(wrapper.vm.limit).toEqual(1);
  });

  test('search', () => {
    const wrapper = factory();
    wrapper.vm.search = 1;
    expect(wrapper.vm.search).toEqual(1);
  });

  test('view', () => {
    const wrapper = factory();
    wrapper.vm.view = 1;
    expect(wrapper.vm.view).toEqual(1);
  });

  test('direction', () => {
    const wrapper = factory();
    wrapper.vm.direction = 1;
    expect(wrapper.vm.direction).toEqual(1);
  });

  test('sortBy', () => {
    const wrapper = factory();
    wrapper.vm.sortBy = 1;
    expect(wrapper.vm.sortBy).toEqual(1);
  });

  test('reset', () => {
    const wrapper = factory();
    wrapper.vm.reset = false;
    expect(wrapper.vm.reset).toEqual(false);
  });

  test('groupBy', () => {
    const wrapper = factory();
    wrapper.vm.groupBy = 'category';
    expect(wrapper.vm.groupBy).toEqual('category');
  });
});
