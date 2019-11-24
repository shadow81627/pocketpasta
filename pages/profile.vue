<template>
  <div class="container">
    <client-only>
      <profile />
    </client-only>
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
