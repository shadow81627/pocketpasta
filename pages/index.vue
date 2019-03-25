<template>
  <div class="home">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h1 class="mt-5">PocketPasta</h1>
        <img
          alt="Pocket Pasta logo"
          src="~/assets/logo.png"
          class="img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import linkData from '@/assets/link-data/pocketpasta.json';
export default {
  layout: 'default',
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(linkData),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      link: [
        {
          rel: 'canonical',
          href: 'https://pocketpasta.com',
        },
      ],
    };
  },
};
</script>
