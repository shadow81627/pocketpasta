import { shallowMount } from '@vue/test-utils';
import Keywords from '@/components/Keywords.vue';

const factory = () =>
  shallowMount(Keywords, {
    propsData: {
      tags: ['html5', 'css3', 'jquery', 'bootstrap4'],
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
