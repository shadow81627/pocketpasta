<template>
  <v-footer class="px-3 hidden-print-only" inset app absolute height="auto">
    <v-card flat color="transparent">
      <v-card-text class="text-muted">version: {{ version }}</v-card-text>
    </v-card>
    <v-spacer />
    <v-card flat color="transparent">
      <v-card-text class="text-muted"
        >This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    version: process.env.VERSION,
  }),
};
</script>
