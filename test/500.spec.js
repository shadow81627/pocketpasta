import { shallowMount } from '@vue/test-utils';
import component from '@/components/error/500';

const factory = () =>
  shallowMount(component, {
    propsData: {
      error: {
        statusCode: 500,
        message: 'Error',
      },
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
