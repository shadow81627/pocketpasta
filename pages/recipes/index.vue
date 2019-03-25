<template>
  <div class="recipes">
    <h1>Recipes</h1>
    <ul class="list-group-flush" style="list-style-type: none; padding: 0;">
      <nuxt-link
        v-for="recipe in recipes"
        :key="recipe.id"
        class="list-group-item"
        :to="`/recipes/detail/${recipe.id}`"
        tag="li"
      >
        <a>{{ recipe.name || `Recipe: ${recipe.id}` }}</a>
      </nuxt-link>
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
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://pocketpasta.com/recipes',
        },
      ],
    };
  },
};
</script>
