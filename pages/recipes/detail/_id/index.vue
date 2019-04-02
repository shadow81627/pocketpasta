<template>
  <Recipe />
</template>

<script>
import Recipe from '@/components/Recipe.vue';

export default {
  layout: 'edit',
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
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/detail/${this.id}`,
        },
      ],
    };
  },
};
</script>
