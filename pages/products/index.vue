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
import Product from '@/models/Product';
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  async fetch() {
    try {
      // this.$axios.setToken(
      //   //
      //   this.$config.API_TOKEN,
      //   // 'Bearer',
      // );
      const products = await new Product().get();
      console.log('products', products);
    } catch (e) {
      // console.log(e);
    }
  },
  // fetchOnServer: false,
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
