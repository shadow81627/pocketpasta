<template>
  <div class="container">
    <list
      v-bind="{
        heading: $t('products.heading'),
        layout: 'list',
        collection: 'products',
      }"
    />
  </div>
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
