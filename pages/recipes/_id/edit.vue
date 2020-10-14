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
      link: [],
    };
  },
};
</script>
