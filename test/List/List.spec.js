import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import Component from '@/components/List/List';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);

describe('List', () => {
  const factory = () =>
    shallowMount(Component, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
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
});
