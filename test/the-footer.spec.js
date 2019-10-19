import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Component from '@/components/Layout/the-footer';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('Footer', () => {
  const factory = () =>
    shallowMount(Component, {
      localVue,
      data: () => ({
        version: '0.11.19',
        commit: 'a95a529a01ab4fe627cc276b35ed8f5e0c6f45d9',
      }),
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    wrapper.setData({ lastModified: '2019-10-19 19:11:49' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders properly without lastModified', () => {
    const wrapper = factory();
    wrapper.setData({ lastModified: null });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
