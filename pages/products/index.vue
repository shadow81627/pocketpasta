<template>
  <div class="container">
    <List
      v-bind="{ heading: $t('products.heading'), list, layout: 'columns' }"
    />
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
      return this.$store.state.products;
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find the best palce to buy pasta ingredients.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/products',
        },
      ],
    };
  },
};
</script>
