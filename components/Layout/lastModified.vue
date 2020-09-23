<template>
  <client-only>
    <v-col cols="auto">
      <v-card flat tile color="transparent">
        <v-card-text class="py-2">
          <span>Last modified: </span>
          <span>{{
            utc ? new Date(lastModified).toUTCString() : new Date(lastModified)
          }}</span>
        </v-card-text>
      </v-card>
    </v-col>
  </client-only>
</template>

<script>
export default {
  props: {
    utc: Boolean,
  },
  computed: {
    lastModified() {
      return this.$config.DATE_GENERATED;
    },
  },
};
</script>

<style></style>
