import { shallowMount } from '@vue/test-utils';
import Page from '@/pages/profile.vue';

const factory = () => shallowMount(Page, {});

describe('profile', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
