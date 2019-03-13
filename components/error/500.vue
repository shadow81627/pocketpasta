<template>
  <div class="container">
    <h1>OOPSIE WOOPSIE!!</h1>
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
