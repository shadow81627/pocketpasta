<template>
  <v-footer class="hidden-print-only" height="auto">
    <div class="container-fluid">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text class="text-muted">
              <span>Version: {{ version }}</span>
              |
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
            <v-card-text class="text-muted"
              >This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              and
              <a href="https://policies.google.com/terms">Terms of Service</a>
              apply.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card flat tile color="transparent">
            <v-card-text class="py-2 text-left">
              <span
                >Made with <span v-if="false">🌭</span><span>🍝</span> in
                Brisbane, Australia</span
              ><br />
              <span>© 2015 | PocketPasta</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <v-col v-if="lastModified" cols="auto">
          <v-card flat tile color="transparent">
            <v-card-text class="py-2">
              <span
                >Last modified: {{ new Date(lastModified).toUTCString() }}</span
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-footer>
</template>

<script>
export default {
  filters: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
  data: () => ({
    version: process.env.VERSION,
    commit: process.env.COMMIT || process.env.TRAVIS_COMMIT,
    lastModified: document ? document.lastModified : null,
  }),
};
</script>
