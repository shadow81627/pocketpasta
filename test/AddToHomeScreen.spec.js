import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import component from '@/components/AddToHomeScreen.vue';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

describe('AddToHomeScreen', () => {
  const factory = () => shallowMount(component, { localVue });

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
