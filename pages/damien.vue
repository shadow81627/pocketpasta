<template>
  <div class="container">
    <div class="row">
      <profile />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import damien from '@/assets/link-data/damien.json';

import Profile from '@/components/Profile.vue';

export default {
  components: {
    Profile,
  },
  data: () => ({
    damien,
  }),
  head() {
    return {
      script: [
        {
          json: damien,
          type: 'application/ld+json',
        },
      ],
    };
  },
};
</script>
