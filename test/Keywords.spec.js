import { shallowMount } from '@vue/test-utils';
import Keywords from '@/components/Keywords.vue';

const factory = () => shallowMount(Keywords, {});

describe('KeyValue', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
