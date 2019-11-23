<template>
  <div class="container">
    <profile />
  </div>
</template>

<script>
import Profile from '@/components/Profile';
export default {
  middleware: ['auth'],
  components: {
    Profile,
  },
};
</script>
