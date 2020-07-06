import index from '@/pages/index.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const factory = () =>
  shallowMount(index, {
    localVue,
    vuetify,
    propsData: {
      label: 'Job Title',
      value: 'Full Stack Web Developer',
    },
  });

describe('index', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(index.head()).toBeTruthy();
  });
});
