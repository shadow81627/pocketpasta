import Component from '@/components/Layout/lastModified.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

localVue.use(Vuex);
Vue.use(Vuetify);

const factory = () =>
  shallowMount(Component, {
    localVue,
    vuetify,
    mocks: { $config: {} },
    propsData: {
      utc: true,
    },
  });

describe('Last Modified', () => {
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
