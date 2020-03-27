import Component from '@/pages/releases.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () =>
  shallowMount(Component, {
    localVue,
  });

describe('releases page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    // wrapper.setMethods({ content: () => '# aBC' });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
