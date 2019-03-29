import { shallowMount } from '@vue/test-utils';
import component from '@/components/AddToHomeScreen.vue';

describe('AddToHomeScreen', () => {
  const factory = () => shallowMount(component, {});

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
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
