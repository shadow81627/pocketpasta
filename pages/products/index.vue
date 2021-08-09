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
import { memory } from '@/db/orbit';
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  async fetch() {
    const thing = {
      type: 'thing',
      id: 1,
      attributes: {
        name: 'thing',
        description: 'thing description',
      },
    };

    const product = {
      type: 'product',
      id: 2,
      attributes: {
        gtin13: 8002560200564,
      },
      relationships: {
        thing: { data: { type: 'thing', id: 1 } },
      },
    };

    await memory.update((t) => [t.addRecord(thing), t.addRecord(product)]);

    const products = await memory.query((q) =>
      q.findRecords('product').sort('name'),
    );
    console.log(products);
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
