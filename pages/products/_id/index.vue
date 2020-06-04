<template>
  <div class="container">
    <product v-bind="item" />
  </div>
</template>

<script>
import Product from '@/components/Product/Product';

export default {
  components: {
    Product,
  },
  async asyncData(context) {
    const id = parseInt(context.route.params.id, 10);
    const item = await context.$content('products', id).fetch();
    return { id, item };
  },
  data() {
    return { id: this.$route.params.id };
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://pocketpasta.com/products/${this.id}`,
        },
      ],
    };
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
};
</script>
