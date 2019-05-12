import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Component from '@/components/List/Card';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe('List Card', () => {
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

  test('filter truncate', () => {
    expect(Component.filters.truncate('text', 2, '....')).toEqual('te....');
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
