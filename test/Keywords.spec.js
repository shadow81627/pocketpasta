import { shallowMount, createLocalVue } from '@vue/test-utils';
import Keywords from '@/components/Keywords.vue';

const localVue = createLocalVue();

const factory = () =>
  shallowMount(Keywords, {
    localVue,
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
