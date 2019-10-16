<template>
  <div class="container" v-html="content()" />
</template>

<script>
import content from '@/CHANGELOG.md';

export default {
  methods: {
    content() {
      return content;
    },
  },
};
</script>
