<template>
  <div />
</template>

<script>
export default {
  mounted: function() {
    this.$auth.loginWith('auth0');
  },
};
</script>
