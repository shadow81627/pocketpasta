import { shallowMount, createLocalVue } from '@vue/test-utils';
import Component from '@/components/Layout/LangSwitcher';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('LangSwitcher', () => {
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
