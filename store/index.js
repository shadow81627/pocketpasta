import damien from '@/assets/link-data/damien.json';

import recipes from '@/assets/link-data/recipes';

import products from '@/assets/link-data/products';

import themes from '@/assets/themes';

export const state = () => ({
  user: null,
  themes,
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
  getUser: (state) => {
    return state.user;
  },
};

export const mutations = {
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
