<template>
  <div class="container" />
</template>

<script>
export default {
  data() {
    return { id: this.$route.params.id };
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/detail/${this.id}/edit`,
        },
      ],
    };
  },
};
</script>
