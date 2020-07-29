import Component from '@/pages/notes/index.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(VueRouter);

const router = new VueRouter();

const factory = () =>
  shallowMount(Component, {
    localVue,
    router,
    $pouch: {
      changes: () => ({ on: () => ({}) }),
      post: () => ({}),
      put: () => ({}),
      upsert: () => ({}),
      find: () => [],
    },
    mocks: {
      $fetchState: {},
      $pouch: {
        changes: () => ({ on: () => ({}) }),
        post: () => ({}),
        put: () => ({}),
        upsert: () => ({}),
        find: () => [],
      },
    },
  });

describe('Notes page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('deleteItem', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.deleteItem({ _id: 'test' })).toBe(undefined);
  });
  test('save', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.save({})).toBe(undefined);
  });

  test('fetch', async () => {
    const wrapper = factory();
    expect(await wrapper.vm.$options.fetch()).toEqual(undefined);
    expect(wrapper.vm.items).toEqual([]);
  });

  test('content', () => {
    const wrapper = factory();
    wrapper.vm.content = 1;
    expect(wrapper.vm.content).toEqual(undefined);
  });

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
