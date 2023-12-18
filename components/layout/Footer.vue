<template>
  <v-footer class="hidden-print-only">
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <v-list
                v-if="Array.isArray(items) && items.length"
                dense
                :role="undefined"
                class="d-flex"
              >
                <v-list-item
                  v-for="item in items"
                  :key="item.name"
                  :to="{ name: item.route }"
                  exact
                  :active="false"
                  class="text-decoration-none"
                >
                  <template #prepend>
                    <v-list-item-action style="margin-right: 8px">
                      <BaseIcon :icon="item.icon"></BaseIcon>
                    </v-list-item-action>
                  </template>
                  <v-list-item-title
                    style="font-size: 16px; line-height: 1.4"
                    >{{ item.name }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
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
  async setup() {
    const config = useRuntimeConfig();

    const version = config.public.VERSION;
    const commit = config.public.COMMIT;

    const { data: items } = await useAsyncData(
      "layout-footer-pages",
      () => queryContent("layout/footer").find(),
      {
        // server: false,
        transform(data) {
          const items = data.map((item) => ({
            ...item,
            pos: fractionToDecimal(item.pos),
          }));
          return useSortBy(items, ["pos"]);
        },
      },
    );

    return {
      utc: false,
      version,
      commit,
      items,
    };
  },
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
});
</script>
