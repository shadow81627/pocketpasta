import component from '@/components/error/500';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);

let vuetify;

const factory = () =>
  shallowMount(component, {
    localVue,
    vuetify,
    propsData: {
      error: {
        statusCode: 500,
        message: 'Error',
      },
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  });

describe('500', () => {
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

  test('head', () => {
    component.$t = (m) => m;
    expect(component.head()).toBeTruthy();
  });
});
