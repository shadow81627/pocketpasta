import { shallowMount } from '@vue/test-utils';
import newsletter from '@/pages/newsletter.vue';

const factory = () => shallowMount(newsletter, {});

describe('newsletter', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
