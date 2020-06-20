import newsletter from '@/pages/newsletter.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);

let vuetify;

const factory = () =>
  shallowMount(newsletter, {
    localVue,
    vuetify,
    mocks: {
      $ga: { event: () => true },
    },
  });

describe('newsletter', () => {
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
    expect(newsletter.head()).toBeTruthy();
  });

  test('subscribe event', () => {
    const wrapper = factory();
    expect(wrapper.vm.subscribe()).toBe();
  });
});
