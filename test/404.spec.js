import { shallowMount } from '@vue/test-utils';
import component from '@/components/error/404.vue';

const factory = () => shallowMount(component, {});

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
    expect(component.head()).toBeTruthy();
  });
});
