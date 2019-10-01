import damien from '@/assets/link-data/damien.json';

import recipes from '@/assets/link-data/recipes';

import products from '@/assets/link-data/products';

import themes from '@/assets/themes';

export const state = () => ({
  user: null,
  themes,
  theme: {
    dark: false,
    value: 'default',
    href: '',
  },
  recipes,
  products,
  damien,
});

export const getters = {
  getRecipeById: (state) => (id) =>
    state.recipes.find((recipe) => recipe.id === id),
  getProductById: (state) => (id) =>
    state.products.find((product) => product.id === id),
  getThemeById: (state) => (value) =>
    state.themes.find((theme) => theme.value === value),
  getCurrentTheme: (state) => () => {
    return {
      hid: 'theme',
      href: state.theme.href,
      rel: 'stylesheet',
      dark: state.theme.dark,
    };
  },
  getUser: (state) => {
    return state.user;
  },
};

export const mutations = {
  setTheme(currentState, theme) {
    currentState.theme = theme;
    this.$auth.$storage.setUniversal('theme', theme, true);
    this.app.vuetify.framework.theme.dark = theme.dark;
  },
  setUser(currentState, user) {
    // stupid hack to clone the object since something is modifying it
    return (currentState.user = JSON.parse(JSON.stringify(user)));
  },
};

export const actions = {
  setUser: (context, user) => {
    return context.commit('setUser', user);
  },
};
