import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/newsletter',
      name: 'newsletter',
      component: () => import(/* webpackChunkName: "newsletter" */ './views/Newsletter.vue'),
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import(/* webpackChunkName: "recipes" */ './views/recipes/RecipeList.vue'),
    },
    {
      path: '/recipes/detail/:id',
      name: 'recipe',
      component: () => import(/* webpackChunkName: "recipe" */ './views/recipes/RecipeDetail.vue'),
    },
  ],
});
