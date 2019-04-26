import { shallowMount } from '@vue/test-utils';
import component from '@/components/error/404.vue';

const factory = () =>
  shallowMount(component, {
    propsData: {
      error: {
        statusCode: 404,
        message: 'Page not Found',
      },
    },
  });

describe('404', () => {
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
