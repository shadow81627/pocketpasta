<template>
  <div class="container">
    <list
      v-bind="{
        heading: $t('products.heading'),
        layout: 'columns',
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
          content: 'Find the best palce to buy pasta ingredients.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.baseUrl}/products`,
        },
      ],
    };
  },
};
</script>
