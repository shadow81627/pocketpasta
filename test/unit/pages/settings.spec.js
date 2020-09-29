import settings from '@/pages/settings.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);

let vuetify;

const factory = () =>
  shallowMount(settings, {
    localVue,
    vuetify,
    mocks: { $warehouse: { get: () => {} }, $config: {} },
  });

describe('settings', () => {
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

  test('head', () => {
    expect(settings.head()).toBeTruthy();
  });
});
