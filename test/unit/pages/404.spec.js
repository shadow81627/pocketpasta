import component from '@/components/error/404.vue';
import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuetify);

const factory = () =>
  shallowMount(component, {
    localVue,
    propsData: {
      error: {
        statusCode: 404,
        message: 'Page not Found',
      },
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  });

describe('404', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
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
