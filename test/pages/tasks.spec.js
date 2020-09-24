import Component from '@/pages/tasks.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuetify);

localVue.use(VueRouter);

const router = new VueRouter();

const $db = {
  tasks: {
    post: () => ({}),
    put: () => ({}),
    upsert: () => ({}),
    find: () => ({ $: { subscribe: () => ({ docs: [] }) } }),
  },
};

const factory = () =>
  shallowMount(Component, {
    localVue,
    router,
    $db,
    mocks: {
      $auth: { user: {} },
      $fetchState: {},
      $db,
    },
  });

describe('Tasks page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('close', () => {
    const wrapper = factory();
    wrapper.vm.close();
    expect(wrapper.vm.dialog).toEqual(false);
  });

  test('deleteItem', async () => {
    const wrapper = factory();
    expect(
      await wrapper.vm.deleteItem({ name: 'test', remove: () => {} }),
    ).toBe(undefined);
  });

  test('saveCategory', async () => {
    const wrapper = factory();
    expect(
      await wrapper.vm.saveCategory({
        tasks: [{ name: 'task' }],
        value: 'category',
      }),
    ).toBe(undefined);
  });

  test('create', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.create()).toBe(undefined);
  });

  test('save', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.save({})).toBe(undefined);
  });

  test('fetch', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.$options.fetch()).toBe(undefined);
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
    wrapper.vm.page = 2;
    expect(wrapper.vm.page).toEqual(1);
  });

  test('limit', () => {
    const wrapper = factory();
    wrapper.vm.limit = 1;
    expect(wrapper.vm.limit).toEqual(1);
  });

  test('search', () => {
    const wrapper = factory();
    wrapper.vm.search = 'search';
    expect(wrapper.vm.search).toEqual('search');
  });

  test('view', () => {
    const wrapper = factory();
    wrapper.vm.view = 'grid';
    expect(wrapper.vm.view).toEqual('grid');
  });

  test('direction', () => {
    const wrapper = factory();
    wrapper.vm.direction = 'asc';
    expect(wrapper.vm.direction).toEqual('asc');
  });

  test('sortBy', () => {
    const wrapper = factory();
    wrapper.vm.sortBy = 1;
    expect(wrapper.vm.sortBy).toEqual(null);
  });

  test('groupBy', () => {
    const wrapper = factory();
    wrapper.vm.groupBy = 1;
    expect(wrapper.vm.groupBy).toEqual(null);
  });

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
