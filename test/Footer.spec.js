import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Component from '@/components/Layout/Footer';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('Footer', () => {
  const factory = () => shallowMount(Component, { localVue });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
