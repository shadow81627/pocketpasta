<template>
  <List
    v-bind="{
      heading: $t('products.heading'),
      layout: 'list',
      collection: 'products',
    }"
  />
</template>

<script>
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find the best place to buy pasta ingredients.',
        },
      ],
    };
  },
};
</script>
