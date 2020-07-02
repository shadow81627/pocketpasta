import Component from '@/components/ReadMore.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

Vue.use(Vuetify);

describe('ReadMore', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const factory = () => shallowMount(Component, { vuetify, localVue });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
