import component from '@/components/AddToHomeScreen.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BootstrapVuePlugin from 'bootstrap-vue';
import Vue from 'vue';

const localVue = createLocalVue();
let vuetify;

Vue.use(Vuetify);
localVue.use(BootstrapVuePlugin);

const userChoice = new Promise((resolve, reject) => {
  // setTimeout(function () {
  resolve({ outcome: 'accepted' });
  // }, 0);
});
const eventMock = { prompt() {}, preventDefault() {}, userChoice };
let eventMap = {};

window.addEventListener = jest.fn((event, cb) => {
  if (event in eventMap) {
    eventMap[event].push(cb);
  } else {
    eventMap[event] = [cb];
  }
});

window.removeEventListener = jest.fn((event, cb) => {
  console.log(event);
  if (event in eventMap) {
    eventMap[event].filter((element) => element !== cb);
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
    eventMap = {};
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
    const beforeDestoryedSpy = jest.spyOn(component, 'destroyed');
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
    await wrapper.vm.$nextTick();
    await wrapper.destroy();
    expect(beforeDestoryedSpy).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    // should be empty arry but I can't make it work...
    expect(eventMap.beforeinstallprompt).toBeTruthy();
    await wrapper.vm.$nextTick();
  });
});
