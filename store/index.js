import recipe from '@/assets/link-data/spaghetti.json';

import damien from '@/assets/link-data/damien.json';

import pastaAglioEOlio from '@/assets/link-data/recipe/pasta_aglio_e_olio.json';

export const state = () => ({
  theme: {
    name: '',
    href: '',
  },
  recipes: [
    { ...recipe, id: 1 },
    { ...pastaAglioEOlio, id: 2 },
    { id: 3 },
    { id: 4 },
  ],
  damien,
});

export const getters = {
  getRecipeById: (state) => (id) =>
    state.recipes.find((recipe) => recipe.id === id),
  getCurrentTheme: (state) => () => {
    return { hid: state.theme.name, href: state.theme.href, rel: 'stylesheet' };
  },
};

export const mutations = {
  setTheme(currentState, theme) {
    // const newState = { ...currentState };
    currentState.theme = theme;
  },
};

export const actions = {};
