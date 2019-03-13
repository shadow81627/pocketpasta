import recipe from '@/assets/link-data/spaghetti.json';

export const state = () => ({
  theme: {
    name: 'darky',
    href: 'https://bootswatch.com/4/darkly/bootstrap.min.css',
  },
  recipes: [{ ...recipe, id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
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
