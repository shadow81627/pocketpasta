import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import Component from '@/components/List/ViewSwitcher';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);

describe('ViewSwitcher', () => {
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

  test('currentLayout', () => {
    const wrapper = factory();
    expect(wrapper.vm.currentLayout).toBeTruthy();
  });

  test('availableLayouts', () => {
    const wrapper = factory();
    expect(wrapper.vm.availableLayouts).toBeTruthy();
  });

  test('inputListeners', () => {
    const wrapper = factory();
    expect(wrapper.vm.inputListeners).toBeTruthy();
  });
});
