<template>
  <v-footer class="hidden-print-only">
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <span>Version: {{ $config.VERSION }}</span>
              <span>|</span>
              <span>Commit: </span>
              <nuxt-link :to="localePath({ name: 'releases' })"
                ><span>
                  {{ shortHash($config.COMMIT || $config.TRAVIS_COMMIT) }}</span
                ></nuxt-link
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <nuxt-link to="/">Home</nuxt-link> |
              <nuxt-link to="/about">About</nuxt-link> |
              <nuxt-link to="/contact">Contact</nuxt-link> |
              <nuxt-link to="/newsletter">Newsletter</nuxt-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat tile color="transparent">
            <v-card-text class="py-2 text-left">
              <span>Made with </span>
              <span>🍝</span>
              <span> in Brisbane, Australia</span>
              <span>© 2015 | PocketPasta</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <lastModified v-bind="{ utc }" />
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import lastModified from './lastModified';
export default {
  components: {
    lastModified,
  },
  data: () => ({
    utc: false,
  }),
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
};
</script>
