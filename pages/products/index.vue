<template>
  <div>
    {{ products }}
    <!-- <List
    v-bind="{
      heading: $t('products.heading'),
      layout: 'list',
      collection: 'products',
    }"
  /> -->
  </div>
</template>

<script>
import { remote } from '@/db/orbit';
// import List from '@/components/List/List';
export default {
  components: {
    // List,
  },
  data: () => ({ products: [] }),
  async fetch() {
    console.log('fetch');
    const products = await remote.query((q) =>
      q.findRecords('product').sort('name'),
    );
    this.products = products;
    console.log('products', products);
  },
  fetchOnServer: false,
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
