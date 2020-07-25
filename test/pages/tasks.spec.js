import Component from '@/pages/tasks.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVuePlugin);
localVue.use(VueRouter);

const router = new VueRouter();

const factory = () =>
  shallowMount(Component, {
    localVue,
    router,
    mocks: {
      $auth: { user: {} },
      $fetchState: {},
      $fireStore: {
        collection: () => ({
          doc: () => ({
            set: () =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve('foo');
                }, 300);
              }),
          }),
          add: () => ({}),
        }),
      },
      $pouch: {
        changes: () => ({ on: () => ({}) }),
        post: () => ({}),
        put: () => ({}),
        upsert: () => ({}),
      },
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
    expect(await wrapper.vm.deleteItem({ _id: 'test' })).toBe(undefined);
  });
  test('saveCategory', async () => {
    const wrapper = factory();
    expect(
      await wrapper.vm.saveCategory({ tasks: [{ _id: 'task' }], id: 'test' }),
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

  test('fetch', () => {
    const wrapper = factory();
    expect(wrapper.vm.$options.fetch()).toBeTruthy();
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
