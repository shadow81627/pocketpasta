<template>
  <div class="about">
    <div class="row">
      <div class="col-lg-12 $text-center">
        <h1 class="mt-5">About Pocket Pasta</h1>
        <p class="lead">
          <!-- Pocket Pasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
          PocketPasta is a collection of my demo apps that I build to practice
          my skills.
        </p>
        <!-- <ul class="list-unstyled">
        <li>Bootstrap 4.2.1</li>
        <li>jQuery 3.3.1</li>
        </ul>-->
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- <h2 class="mt-5">Pocket Pasta People</h2> -->
      <Profile v-bind="damien" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import damien from '@/assets/link-data/damien.json';

import Profile from '@/components/ProfileSocial.vue';

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
          innerHTML: JSON.stringify(damien),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
};
</script>
