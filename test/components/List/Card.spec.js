import Component from '@/components/List/Card';
import recipe from '@/assets/link-data/recipes/spaghetti.json';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();

Vue.use(Vuetify);
localVue.use(Vuex);
localVue.use(BootstrapVuePlugin);

describe('List Card', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    shallowMount(Component, {
      propsData: { ...recipe, type: recipe['@type'] },
      vuetify,
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  test('filter truncate', () => {
    expect(Component.methods.truncate('text', 2, '....')).toEqual('te....');
  });

  test('cloudinaryify', () => {
    const image = 'https://google.com/image.png';
    const height = 128;
    const width = 128;
    expect(
      Component.methods.cloudinaryify({
        image,
      }),
    ).toEqual(
      `https://res.cloudinary.com/pocketpasta/image/fetch/w_${width},h_${height},c_fill,f_auto,q_auto/${image}`,
    );
  });

  test('imageData with cloudinary image does not modify url', () => {
    const wrapper = factory();
    const image = {
      url: 'https://res.cloudinary.com/pocketpasta/image/fetch/',
    };
    wrapper.setProps({
      ...recipe,
      image,
    });
    expect(
      wrapper.vm.source({
        image: wrapper.vm.imageUrl,
        height: 256,
        width: 'auto',
      }),
    ).toBeTruthy();
  });

  test('imageData convet to cloudinaty url', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
    });
    expect(
      wrapper.vm.source({
        image: wrapper.vm.imageUrl,
        height: 'auto',
        width: 'auto',
      }),
    ).toBeTruthy();
  });

  test('imageData handle array', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
      image: ['https://res.cloudinary.com/pocketpasta/image/fetch/'],
    });
    expect(
      wrapper.vm.source({
        image: wrapper.vm.imageUrl,
        height: 256,
        width: 'auto',
      }),
    ).toBeTruthy();
  });

  test('imageData handle array of objects', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
      image: [{ url: 'https://res.cloudinary.com/pocketpasta/image/fetch/' }],
    });
    expect(
      wrapper.vm.source({
        image: wrapper.vm.imageUrl,
        height: 256,
        width: 'auto',
      }),
    ).toBeTruthy();
  });

  test('imageData handle null', () => {
    const wrapper = factory();
    wrapper.setProps({
      ...recipe,
      image: null,
    });
    expect(
      wrapper.vm.source({
        image: wrapper.vm.imageUrl,
        height: 256,
        width: 'auto',
      }),
    ).toEqual({ src: '', srcset: '' });
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
