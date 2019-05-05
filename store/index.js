import recipe from '@/assets/link-data/spaghetti.json';

import damien from '@/assets/link-data/damien.json';

import pastaAglioEOlio from '@/assets/link-data/recipe/pasta_aglio_e_olio.json';

import lasagnaSalad from '@/assets/link-data/recipe/lasagna-salad.json';

import themes from '@/assets/themes';

export const state = () => ({
  themes,
  theme: {
    dark: false,
    value: 'default',
    href:
      'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
  },
  recipes: [
    { ...recipe, id: 1 },
    { ...pastaAglioEOlio, id: 2 },
    { ...lasagnaSalad, id: 3 },
  ],
  damien,
});

export const getters = {
  getRecipeById: (state) => (id) =>
    state.recipes.find((recipe) => recipe.id === id),
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
};

export const mutations = {
  setTheme(currentState, theme) {
    currentState.theme = theme;
    this.$auth.$storage.setUniversal('theme', theme, true);
  },
};

export const actions = {};
