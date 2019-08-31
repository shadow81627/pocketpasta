<template>
  <v-footer class="hidden-print-only" height="auto">
    <v-card flat color="transparent">
      <v-card-text class="text-muted">
        <span>Version: {{ version }}</span>
        <span> {{ commit }}</span>
      </v-card-text>
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
    commit: process.env.COMMIT || process.env.TRAVIS_COMMIT,
  }),
};
</script>
