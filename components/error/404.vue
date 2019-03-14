<template>
  <div class="container">
    <h1>Page not found</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
