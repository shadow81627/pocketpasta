<template>
  <div class="recipe">
    <h1>Recipe {{ $route.params.id }} Details</h1>
    <p>I am recipe {{ recipe.id }}</p>
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
