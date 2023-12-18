<template>
  <v-app id="inspire" clipped-left>
    <v-navigation-drawer
      id="navigation-drawer"
      v-model="drawer"
      app
      disable-resize-watcher
      class="hidden-print-only"
    >
      <v-list dense :role="undefined">
        <v-list-item
          v-for="item in items"
          :key="item.name"
          :to="item.route"
          exact
          class="text-decoration-none"
        >
          <template #prepend>
            <v-list-item-action style="margin-right: 32px">
              <BaseIcon :icon="item.icon"></BaseIcon>
            </v-list-item-action>
          </template>
          <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed class="hidden-print-only" height="64" xcolor="#59ecc0">
      <v-app-bar-nav-icon
        id="app-bar-nav-icon"
        aria-label="menu"
        @click.stop="drawer = !drawer"
      >
        <v-progress-circular v-if="loading" indeterminate size="18" width="2" />
        <v-icon v-else icon="$menu"></v-icon>
      </v-app-bar-nav-icon>
      <v-avatar width="32" height="32" tile>
        <!-- <v-img
          :src="$icon(32)"
          :srcset="`${$icon(32)} 1x, ${$icon(64)} 2x`"
          width="32"
          height="32"
          alt="PocketPasta"
          contain
          onerror="javascript:this.style.display = 'none'"
        /> -->
      </v-avatar>

      <v-toolbar-title>
        <span class="brand d-none d-sm-flex pr-2">PocketPasta</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main class="pb-0">
      <slot style="min-height: 100vh"></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dialog: false,
      drawer: false,
    };
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo();
    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs,
      },
      meta: [
        ...i18nSeo.meta,
        {
          hid: "og:url",
          name: "og:url",
          property: "og:url",
          content: `${this.$config.BASE_URL}${this.$route.path}`,
        },
      ],
      link: [...i18nSeo.link],
    };
  },
  computed: {
    items() {
      return [
        {
          icon: "carbon:home",
          name: "Home",
          route: "/",
        },
        // {
        //   icon: "$book",
        //   text: "layout.navigation.recipes",
        //   route: { name: "recipes" },
        // },
        // {
        //   icon: "$store",
        //   text: "layout.navigation.products",
        //   route: { name: "products" },
        // },
        // {
        //   // icon: mdiClipboardListOutline,
        //   text: "Shopping List",
        //   route: { name: "shoppinglist" },
        // },
        // {
        //   icon: "$calendar-check",
        //   text: "Tasks",
        //   route: { name: "tasks" },
        // },
        // {
        //   icon: "$settings",
        //   text: "layout.navigation.settings",
        //   route: { name: "settings" },
        // },
      ];
    },
  },
  mounted() {
    if (process.client) {
      this.loading = false;
    }
  },
};
</script>

<style>
.brand {
  font-size: 1.5rem;
  font-weight: 400;
  vertical-align: middle;
}

/* no pointer events */
.pointer-events-none {
  pointer-events: none;
}

.text-shadow {
  text-shadow: #a1a1a1 0.1em 0.1em 0.175em;
}
</style>
