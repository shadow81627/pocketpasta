import Component from '@/pages/tasks.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () =>
  shallowMount(Component, {
    localVue,
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
    expect(await wrapper.vm.deleteItem()).toBe(undefined);
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

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
