<template>
  <div class="recipe">
    <h1>Recipe {{ $route.params.id }} Details</h1>
    <p>I am recipe {{ recipe }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import linkData from '@/assets/link-data/spaghetti.json';
export default {
  computed: {
    recipe() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      return this.$store.getters.getRecipeById(id);
    },
  },
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(linkData),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
};
</script>
