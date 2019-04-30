import { shallowMount, createLocalVue } from '@vue/test-utils';
import Component from '@/components/Social/Share';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Footer', () => {
  const factory = () => shallowMount(Component, {});

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(Component.head()).toBeTruthy();
  });
});
