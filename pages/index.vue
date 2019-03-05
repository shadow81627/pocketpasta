<template>
  <div class="home">
    <img alt="Pocket Pasta logo" src="~/assets/logo.png">
    <h1>Pocket Pasta</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import linkData from '@/assets/pocketpasta.json';
export default {
  head() {
    return {
      script: [
        {
          innerHTML: linkData,
          type: 'application/ld+json'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
    };
  }
};
</script>
