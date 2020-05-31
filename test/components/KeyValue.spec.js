import KeyValue from '@/components/KeyValue.vue';
import { shallowMount } from '@vue/test-utils';

const factory = () =>
  shallowMount(KeyValue, {
    propsData: {
      label: 'Job Title',
      value: 'Full Stack Web Developer',
    },
  });

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
