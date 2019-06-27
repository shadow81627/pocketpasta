import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '@/components/Layout/Credit/landing-hero-image-credit';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Credit', () => {
  const factory = () => shallowMount(Component, {});

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
