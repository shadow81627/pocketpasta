<template>
  <div class="home">
    <img alt="Pocket Pasta logo" src="~/assets/logo.png" />
    <h1>Pocket Pasta</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import linkData from '@/assets/link-data/pocketpasta.json';
export default {
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(linkData),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
};
</script>
