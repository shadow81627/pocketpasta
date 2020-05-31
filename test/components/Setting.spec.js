import Component from '@/components/settings/setting';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

localVue.use(Vuex);
Vue.use(Vuetify);

let vuetify;

const factory = () =>
  shallowMount(Component, {
    localVue,
    vuetify,
    propsData: {
      icon: 'icon',
      label: 'label',
      description: 'description',
      id: 'id',
    },
  });

describe('Setting', () => {
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
