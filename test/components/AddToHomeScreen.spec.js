import component from '@/components/AddToHomeScreen.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

describe('AddToHomeScreen', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () => shallowMount(component, { localVue, vuetify });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('events', () => {
    const wrapper = factory();
    wrapper.trigger('beforeinstallprompt');
    wrapper.trigger('click');
  });
});
