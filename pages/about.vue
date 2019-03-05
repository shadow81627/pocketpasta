<template>
  <div class="about">
    <h1>About Pocket Pasta</h1>
    <p style="width: 80ch;margin: auto;">
      <!-- Pocket Pasta is a progressive web app for journaling your life.
      The aim is to have a multi module app that allows users to record how they live.
      Documenting how we live is the first step in planning how to live.-->
      Pocket Pasta is a collection of my demo apps that I build to practice my skills.
    </p>
    <h2>Pocket Pasta People</h2>
    <ul style="list-style-type: none; padding: 0;">
      <li>{{damien.name}}</li>
      <li>
        <a :href="damien.email">{{damien.email}}</a>
      </li>
      <li>{{damien.jobTitle}}</li>
      <li v-for="link in damien.sameAs" :key="link">
        <a :href="link">{{link}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import linkData from '@/assets/pocketpasta.json';
import damien from '@/assets/damien.json';
export default {
  data: () => ({
    damien
  }),
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
