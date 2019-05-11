import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import component from '@/components/error/500';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuetify);

const factory = () =>
  shallowMount(component, {
    localVue,
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
