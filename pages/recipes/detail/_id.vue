<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
    <!-- <p>Author: {{ recipe.author }}</p> -->
    <p>datePublished: {{ recipe.datePublished }}</p>
    <p>Makes: {{ recipe.recipeYield }}</p>
    <h2>recipeIngredient:</h2>
    <ol>
      <li
        v-for="ingredient in recipe.recipeIngredient"
        :key="ingredient"
        style="list-style-position: inside;"
      >
        {{ ingredient }}
      </li>
    </ol>
    <p>Tags: {{ recipe.keywords }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    recipe() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      return this.$store.getters.getRecipeById(id);
    },
  },
};
</script>
