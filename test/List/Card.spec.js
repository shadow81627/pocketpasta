import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import Component from '@/components/List/Card';

import recipe from '@/assets/link-data/recipes/spaghetti.json';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);

describe('List Card', () => {
  const factory = () =>
    shallowMount(Component, {
      propsData: { ...recipe },
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
