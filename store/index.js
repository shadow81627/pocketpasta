import recipe from '@/assets/link-data/spaghetti.json';

import damien from '@/assets/link-data/damien.json';

import pastaAglioEOlio from '@/assets/link-data/recipe/pasta_aglio_e_olio.json';

export const state = () => ({
  theme: {
    dark: false,
    value: 'default',
    href:
      'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  },
  recipes: [{ ...recipe, id: 1 }, { ...pastaAglioEOlio, id: 2 }],
  damien,
});

export const getters = {
  getRecipeById: (state) => (id) =>
    state.recipes.find((recipe) => recipe.id === id),
  getCurrentTheme: (state) => () => {
    return {
      hid: state.theme.name,
      href: state.theme.href,
      rel: 'stylesheet',
      dark: state.theme.dark,
    };
  },
};

export const mutations = {
  setTheme(currentState, theme) {
    currentState.theme = theme;
  },
};

export const actions = {};
