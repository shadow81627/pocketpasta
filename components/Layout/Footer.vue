<template>
  <v-footer class="pa-3 hidden-print-only" xinset app absolute>
    <small class="text-muted">version: {{ version }}</small>
    <v-spacer />
    <small class="text-muted"
      >This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </small>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    version: process.env.VERSION,
  }),
};
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
