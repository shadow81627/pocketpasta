import { mount, createLocalVue } from '@vue/test-utils';
import Keywords from '@/components/Keywords.vue';

const localVue = createLocalVue();

const factory = () =>
  mount(Keywords, {
    localVue,
  });

describe('Keywords', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('head', () => {
    expect(Keywords.head()).toBeTruthy();
  });

  test('computes keywords', () => {
    const wrapper = factory();
    expect(wrapper.vm.keywords).toBe('');
  });
});
