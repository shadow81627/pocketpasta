import Component from '@/components/Layout/LangSwitcher';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

localVue.use(Vuex);
Vue.use(Vuetify);

describe('LangSwitcher', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () => shallowMount(Component, { localVue, vuetify });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
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
