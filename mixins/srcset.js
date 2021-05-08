export default {
  methods: {
    _srcset(src = '/v1559982334/hero_rko6us.jpg', options) {
      const defaults = {
        ...options,
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          width: 1280,
        },
        preset: 'default',
      };
      return this.$img.getSizes(src, defaults);
    },
  },
};
