import Component from '@/components/List/List';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);
localVue.use(VueRouter);

const router = new VueRouter();

describe('List', () => {
  const factory = () =>
    shallowMount(Component, {
      localVue,
      router,
      mocks: {
        $fetchState: {},
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
  });

  test('linkGen', () => {
    const wrapper = factory();
    expect(wrapper.vm.linkGen(1)).toBe('?');
    expect(wrapper.vm.linkGen(2)).toBe('?page=2');
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
