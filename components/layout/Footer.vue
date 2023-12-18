<template>
  <v-footer class="hidden-print-only">
    <v-container>
      <v-row no-gutters>
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
      <div class="footer-bottom-bar font-14">
        <div class="d-block d-md-flex align-center">
          <v-card flat color="transparent">
            <v-card-text>
              <span
                >Site by
                <a href="https://daim.digital" target="_blank"
                  >Daim Digital</a
                ></span
              >
              <!-- <span>
                <a href="/" class="link px-4">Terms of Use</a>
                <a href="/" class="link px-4">Legal Disclaimer</a>
                <a href="/" class="link px-4">Privacy Policy</a>
              </span> -->
            </v-card-text>
          </v-card>
          <div class="ml-auto">
            <v-card flat color="transparent">
              <v-card-text>
                <span>{{ version }}</span>
                <span v-if="commit">{{ shortHash(commit) }}</span>
                <a
                  href="https://github.com/shadow81627/pocketpasta/releases"
                  target="_blank"
                  rel="noopener"
                  class="link px-4"
                >
                  <span>Changelog</span>
                </a>
                <a
                  href="https://stats.uptimerobot.com/X7JPPc4pLz/783875768"
                  target="_blank"
                  rel="noopener"
                  class="link px-4"
                  >Status</a
                >
                <LayoutLastModified
                  v-bind="{ utc }"
                  class="link px-4"
                ></LayoutLastModified>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default defineNuxtComponent({
  setup() {
    const config = useRuntimeConfig();

    const version = config.public.VERSION;
    const commit = config.public.COMMIT;

    return {
      utc: false,
      version,
      commit,
    };
  },
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
});
</script>
