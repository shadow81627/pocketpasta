import Keywords from '@/components/Keywords.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Keywords', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Keywords, {
      localVue,
      vuetify,
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
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
