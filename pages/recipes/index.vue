<template>
  <div class="container">
    <List v-bind="{ heading: $t('recipes.heading'), list, layout: 'list' }" />
  </div>
</template>

<script>
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  computed: {
    list() {
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
