import Component from '@/components/List/ItemComponent';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);
localVue.use(VueRouter);

const router = new VueRouter();

describe('ItemComponent', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Component, {
      localVue,
      router,
      vuetify,
      mocks: {
        $fetchState: {},
        process: {
          browser: true,
        },
        $vuetify: {
          theme: {
            dark: true,
          },
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
