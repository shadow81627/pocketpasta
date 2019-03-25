<template>
  <Recipe />
</template>

<script>
import Recipe from '@/components/Recipe.vue';

export default {
  components: {
    Recipe,
  },
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/${this.$route.params.id}`,
        },
      ],
    };
  },
};
</script>
