<template>
  <div class="container">
    <Recipe />
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      :to="`${this.$route.path}/edit`"
    >
      <v-icon>edit</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Recipe from '@/components/Recipe.vue';

export default {
  components: {
    Recipe,
  },
  data() {
    return { id: this.$route.params.id };
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/${this.id}`,
        },
      ],
    };
  },
};
</script>
