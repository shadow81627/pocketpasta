<template>
  <div class="container">
    <theme-selector />
  </div>
</template>

<script>
import ThemeSelector from '@/components/ThemeSelector.vue';

export default {
  components: {
    ThemeSelector,
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/settings',
        },
      ],
    };
  },
};
</script>
