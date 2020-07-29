import Page from '@/pages/login.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);

const factory = () =>
  shallowMount(Page, {
    localVue,
    vuetify,
    propsData: {
      label: 'Job Title',
      value: 'Full Stack Web Developer',
    },
  });

describe('login', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('head', () => {
    expect(Page.head()).toBeTruthy();
  });
});
