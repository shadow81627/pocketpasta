<template>
  <div class="home">
    <img alt="Pocket Pasta logo" src="../assets/logo.png">
    <h1>Pocket Pasta</h1>
    <!-- <HelloWorld msg="Pocket Pasta"/> -->
    <script type="application/ld+json" src="../assets/pocketpasta.json"></script>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
