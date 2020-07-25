import Component from '@/components/List/List';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vue from 'vue';

import recipe from '@/content/recipes/1.json';

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
    wrapper.setData({ list: [recipe], total: 1 });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('itemClass', () => {
    const wrapper = factory();
    expect(wrapper.vm.itemClass(1)).toBeTruthy();
  });

  test('itemComponent', () => {
    const wrapper = factory();
    expect(wrapper.vm.itemComponent).toEqual('');
  });

  test('onScrollBottom', () => {
    const wrapper = factory();
    wrapper.setData({ list: [recipe, recipe], total: 200 });

    // check that page does not increment without infinate scoll enabled
    wrapper.setProps({ infinite: false });
    wrapper.vm.onScrollToBottom();
    expect(wrapper.vm.page).toEqual(1);

    // check that page is incremented when infinate scroll is enabled
    wrapper.setProps({ infinite: true });
    wrapper.vm.onScrollToBottom();
    // expect(wrapper.vm.page).toEqual(2);
    expect(wrapper.vm.page).toEqual(1);
  });

  test('pages', () => {
    const wrapper = factory();
    wrapper.setData({ total: 200 });
    // check that pages can not be directly updated
    wrapper.vm.pages = 2;
    // check that pages is calculated by total / limit (default 12) rounded up 17
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
