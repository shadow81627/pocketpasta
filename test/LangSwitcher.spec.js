import { shallowMount, createLocalVue } from '@vue/test-utils';
import Component from '@/components/Layout/LangSwitcher';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('LangSwitcher', () => {
  const factory = () => shallowMount(Component, { localVue });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('currentLocale', () => {
    const wrapper = factory();
    expect(wrapper.vm.currentLocale).toBeTruthy();
  });
});
