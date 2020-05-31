import Component from '@/pages/profile.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () => shallowMount(Component, { localVue, vuetify });

describe('profile', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
