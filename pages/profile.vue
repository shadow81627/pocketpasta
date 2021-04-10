<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Profile</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
};
</script>
