<template>
  <div class="nuxt-error container">
    <!-- <component :is="errorPage" :error="error" /> -->
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>OOPSIE WOOPSIE!!</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
// import error404 from '@/components/error/404.vue';
// import error500 from '@/components/error/500.vue';

export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // errorPage() {
    //   if (this.statusCode === 404) {
    //     return error404;
    //   }
    //   // catch everything else
    //   return error500;
    // },
  },
};
</script>
