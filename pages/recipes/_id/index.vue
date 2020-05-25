<template>
  <div class="container">
    <recipe v-bind="recipe" />
    <!-- <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      :to="`${this.$route.path}/edit`"
      class="hidden-print-only"
    >
      <v-icon>$edit</v-icon>
    </v-btn> -->
  </div>
</template>

<script>
import Recipe from '@/components/Recipe/Recipe';

export default {
  components: {
    Recipe,
  },
  async asyncData(context) {
    const id = parseInt(context.route.params.id, 10);
    const recipe = await context.$content('recipes', id).fetch();
    return { id, recipe };
  },
  data() {
    return { id: 0, recipe: {} };
  },
  head() {
    return {
      title: this.recipe.name,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/${this.id}`,
        },
      ],
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.recipe.name,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.recipe.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.recipe.description,
        },
      ],
    };
  },
};
</script>
