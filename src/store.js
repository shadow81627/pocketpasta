import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [1, 2, 3, 4],
  },
  getters: {
    getRecipeById: state => id => state.recipes.find(recipe => recipe === id),
  },
  mutations: {

  },
  actions: {

  },
});
