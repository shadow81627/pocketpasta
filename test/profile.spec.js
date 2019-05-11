import { shallowMount, createLocalVue } from '@vue/test-utils';
import Page from '@/pages/profile.vue';
import Vuetify from 'vuetify';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(BootstrapVue);

const factory = () => shallowMount(Page, { localVue });

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
