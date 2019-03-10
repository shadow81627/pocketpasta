<template>
  <Recipe />
</template>

<script>
import Recipe from '@/components/Recipe.vue';

export default {
  components: {
    Recipe,
  },
  computed: {
    recipe() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      return this.$store.getters.getRecipeById(id);
    },
  },
};
</script>
