export const state = () => ({
  recipe: {},
  recipes: [1, 2, 3, 4],
});

export const getters = () => ({
  getRecipeById: state => id => state.recipes.find(recipe => recipe === id),
});
