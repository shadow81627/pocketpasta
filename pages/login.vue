<template>
  <div>
    <h1>Login</h1>
    <code>{{ JSON.stringify($auth.user, null, 2) }}</code>
  </div>
</template>

<script>
export default {
  async fetch(context) {
    await context.app.$auth.fetchUser();
  },
};
</script>
