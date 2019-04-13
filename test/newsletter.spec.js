import { shallowMount } from '@vue/test-utils';
import newsletter from '@/pages/newsletter.vue';

const factory = () =>
  shallowMount(newsletter, {
    mocks: {
      $ga: { event: () => true },
    },
  });

describe('newsletter', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(newsletter.head()).toBeTruthy();
  });

  test('subscribe event', () => {
    const wrapper = factory();
    expect(wrapper.vm.subscribe()).toBe();
  });
});
