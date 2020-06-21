import Component from '@/components/Layout/the-footer';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

localVue.use(Vuex);
Vue.use(Vuetify);

describe('Footer', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Component, {
      localVue,
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      mocks: {
        $config: {
          VERSION: '0.11.19',
          COMMIT: 'a95a529a01ab4fe627cc276b35ed8f5e0c6f45d9',
        },
      },
      data: () => ({
        utc: true,
        lastModified: null,
      }),
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    wrapper.setData({ lastModified: 'Sat 19 Oct 2019 09:11:49 GMT+0000' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders properly without lastModified', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
