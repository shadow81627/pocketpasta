<template>
  <div class="container">
    <div class="recipes">
      <h1>{{ $t('recipes.heading') }}</h1>
      <ul class="list-group-flush" style="list-style-type: none; padding: 0;">
        <nuxt-link
          v-for="recipe in recipes"
          :key="recipe.id"
          class="list-group-item"
          :to="
            localePath({
              name: 'recipes-id',
              params: { id: recipe.id },
            })
          "
          tag="li"
        >
          <a>{{ recipe.name || `Recipe: ${recipe.id}` }}</a>
        </nuxt-link>
      </ul>
    </div>
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
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Easy pasta recipes made with simple ingredients.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/recipes',
        },
      ],
    };
  },
};
</script>
