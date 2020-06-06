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
    const id = context.route.params.id;
    const item = await context.$content('products', id).fetch();
    return { id, item };
  },
  data() {
    return { id: this.$route.params.id, item: {} };
  },
  head() {
    return {
      title: this.item.name,
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.baseUrl}/products/${this.id}`,
        },
      ],
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.item.name,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.item.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.item.description,
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
