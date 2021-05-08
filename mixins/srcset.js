export default {
  methods: {
    _srcset(src = '/v1559982334/hero_rko6us.jpg', options) {
      const defaults = {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        ...options,
      };
      return this.$img.getSizes(src, defaults);
    },
  },
};
