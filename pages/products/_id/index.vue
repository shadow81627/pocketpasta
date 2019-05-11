<template>
  <div class="container">
    <Product />
  </div>
</template>

<script>
import Product from '@/components/Product/Product';

export default {
  components: {
    Product,
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
};
</script>
