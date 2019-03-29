import { shallowMount } from '@vue/test-utils';
import settings from '@/pages/settings.vue';

const factory = () => shallowMount(settings, {});

describe('settings', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(settings.head()).toBeTruthy();
  });
});
