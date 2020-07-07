import component from '@/components/AddToHomeScreen.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const eventMock = { prompt() {}, preventDefault() {} };
const eventMap = {};

window.addEventListener = jest.fn((event, cb) => {
  if (event in eventMap) {
    eventMap[event].push(cb);
  } else {
    eventMap[event] = [cb];
  }
});

function triggerWindowEvent(event, payload) {
  if (event in eventMap) {
    eventMap[event].forEach((callback) => callback(payload));
  }
}

describe('AddToHomeScreen', () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const factory = () =>
    mount(component, {
      localVue,
      vuetify,
      mocks: {
        process: {
          browser: true,
        },
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

  test("emits 'canInstall' on 'beforeinstallprompt' event", async () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
    expect(wrapper.vm.deferredPrompt).toBe(null);
    triggerWindowEvent('beforeinstallprompt', eventMock);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('canInstall')).toBeTruthy();
    expect(wrapper.emitted('canInstall').length).toBe(1);
    expect(wrapper.emitted('canInstall')[0]).toStrictEqual([eventMock]);
    await wrapper.vm.$nextTick();
    await wrapper.trigger('click');
    expect(wrapper.vm.deferredPrompt).toBe(eventMock);
  });
});
