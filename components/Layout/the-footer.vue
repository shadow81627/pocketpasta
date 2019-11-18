<template>
  <v-footer class="hidden-print-only" height="auto">
    <div class="container-fluid">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <span>Version: {{ version }}</span>
              <span>|</span>
              <span>Commit: </span>
              <nuxt-link :to="localePath({ name: 'releases' })"
                ><span> {{ commit | shortHash }}</span></nuxt-link
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <span>This site is protected by reCAPTCHA and the Google</span>
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              <span>and</span>
              <a href="https://policies.google.com/terms">Terms of Service</a>
              <span>apply.</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card flat tile color="transparent">
            <v-card-text class="py-2 text-left">
              <span>Made with </span>
              <span>🍝</span>
              <span> in Brisbane, Australia</span>
              <br />
              <span>© 2015 | PocketPasta</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <lastModified v-bind="{ utc }" />
      </v-row>
    </div>
  </v-footer>
</template>

<script>
import lastModified from './lastModified';
export default {
  components: {
    lastModified,
  },
  filters: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
  data: () => ({
    version: process.env.VERSION,
    commit: process.env.COMMIT || process.env.TRAVIS_COMMIT,
    utc: false,
  }),
};
</script>
