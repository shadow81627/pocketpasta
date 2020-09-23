<template>
  <v-app id="inspire" clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="hidden-print-only"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    ><nuxt-link
                      :to="localePath(item.route ? item.route : {})"
                      >{{ item.text }}</nuxt-link
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i">
              <v-list-item-action v-if="child.icon">
                <v-icon>${{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <nuxt-link :to="localePath(item.route ? item.route : {})">{{
                    child.text
                  }}</nuxt-link></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="localePath(item.route ? item.route : {})"
            nuxt
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      class="hidden-print-only"
      height="64"
    >
      <v-app-bar-nav-icon aria-label="menu" @click.stop="drawer = !drawer"
        ><v-progress-circular v-if="loading" indeterminate size="18" width="2"
      /></v-app-bar-nav-icon>
      <v-avatar width="32" height="32" tile>
        <v-img
          :src="$icon(32)"
          :srcset="`${$icon(32)} 1x, ${$icon(64)} 2x`"
          width="32"
          height="32"
          alt="PocketPasta"
          contain
          onerror="javascript:this.style.display = 'none'"
        />
      </v-avatar>

      <v-toolbar-title>
        <span class="brand d-none d-sm-flex">PocketPasta</span>
      </v-toolbar-title>
      <v-spacer />
      <add-to-home-screen icon />
      <user-menu />
    </v-app-bar>
    <v-main class="pb-0">
      <nuxt style="min-height: 100vh" xkeep-alive />
      <the-footer />
    </v-main>
  </v-app>
</template>

<script>
import { mdiClipboardListOutline } from '@mdi/js';
import AddToHomeScreen from '@/components/AddToHomeScreen.vue';
import UserMenu from '@/components/UserMenu.vue';
import TheFooter from '@/components/Layout/the-footer.vue';
export default {
  components: {
    AddToHomeScreen,
    UserMenu,
    TheFooter,
  },
  data() {
    return {
      loading: true,
      dialog: false,
      drawer: false,
    };
  },
  computed: {
    items() {
      return [
        {
          icon: '$book',
          text: this.$t('layout.navigation.recipes'),
          route: { name: 'recipes' },
        },
        {
          icon: '$store',
          text: this.$t('layout.navigation.products'),
          route: { name: 'products' },
        },
        {
          icon: mdiClipboardListOutline,
          text: 'Shopping List',
          route: { name: 'shoppinglist' },
        },
        {
          icon: '$calendar-check',
          text: 'Tasks',
          route: { name: 'tasks' },
        },
        // {
        //   icon: '$notes',
        //   text: 'Notes',
        //   route: { name: 'notes' },
        // },
        {
          icon: '$settings',
          text: this.$t('layout.navigation.settings'),
          route: { name: 'settings' },
        },
      ];
    },
  },
  mounted() {
    if (process.client) {
      this.loading = false;
    }
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
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${this.$config.BASE_URL}${this.$route.path}`,
        },
      ],
      link: [
        ...i18nSeo.link,
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `${this.$config.BASE_URL}${this.$route.path}`,
        },
      ],
    };
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
</style>
