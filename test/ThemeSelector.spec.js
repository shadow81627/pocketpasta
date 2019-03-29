import { shallowMount, createLocalVue } from '@vue/test-utils';
import ThemeSelector from '@/components/ThemeSelector.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ThemeSelector', () => {
  let getters;
  let state;
  let store;
  let mutations;

  beforeEach(() => {
    state = {
      theme: {
        name: 'darky',
        href: 'https://bootswatch.com/4/darkly/bootstrap.min.css',
      },
    };

    getters = {
      clicks: () => 2,
      inputValue: () => 'input',
    };

    mutations = {
      setTheme(currentState, theme) {
        // const newState = { ...currentState };
        currentState.theme = theme;
      },
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations,
    });
  });

  const factory = () =>
    shallowMount(ThemeSelector, {
      store,
      localVue,
    });

  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('theme getter', () => {
    const wrapper = factory();
    wrapper.vm.currentTheme = 'darkly';
    expect(wrapper.vm.currentTheme).toBeTruthy();
  });
});
