import Component from '@/pages/create.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () =>
  shallowMount(Component, {
    localVue,
    vuetify,
  });

describe('create page', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
