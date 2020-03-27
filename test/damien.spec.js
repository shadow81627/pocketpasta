import damien from '@/pages/damien.vue';
import { shallowMount } from '@vue/test-utils';

const factory = () => shallowMount(damien, {});

describe('damien', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('head', () => {
    expect(damien.head()).toBeTruthy();
  });
});
