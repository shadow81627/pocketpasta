<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <ul style="list-style-type: none; padding: 0;">
      <li v-for="recipe in recipes" :key="recipe">
        <nuxt-link :to="`/recipes/detail/${recipe.id}`">
          Recipe {{ recipe.id }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
  },
};
</script>
