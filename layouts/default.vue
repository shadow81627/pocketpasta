<template>
  <v-app id="inspire" :dark="isDark">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
      class="hidden-print-only"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title
                    ><nuxt-link
                      :to="localePath(item.route ? item.route : {})"
                      >{{ item.text }}</nuxt-link
                    ></v-list-tile-title
                  >
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <nuxt-link :to="localePath(item.route ? item.route : {})">{{
                    child.text
                  }}</nuxt-link></v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            :key="item.text"
            :to="localePath(item.route ? item.route : {})"
            active-class="btn-primary pointer-events-none"
            nuxt
            exact
            class="text-decoration-none"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <small>version: {{ version }}</small>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      class="hidden-print-only"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon aria-label="menu" @click.stop="drawer = !drawer" />
        <img
          :src="$icon(32)"
          width="32"
          height="32"
          class="rounded"
          alt="PocketPasta"
          onerror="javascript:this.style.display = 'none'"
        />
        <span class="brand mx-1 hidden-sm-and-down">PocketPasta</span>
      </v-toolbar-title>
      <v-spacer />
      <small>version: {{ version }}</small>
      <AddToHomeScreen icon />
      <LangSwitcher />
      <UserMenu />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import AddToHomeScreen from '@/components/AddToHomeScreen.vue';
import UserMenu from '@/components/User/Menu.vue';
import Footer from '@/components/Layout/Footer.vue';
import LangSwitcher from '@/components/Layout/LangSwitcher';
export default {
  components: {
    AddToHomeScreen,
    UserMenu,
    Footer,
    LangSwitcher,
  },
  data: function() {
    return {
      version: process.env.VERSION,
      dialog: false,
      drawer: false,
      items: [
        {
          icon: 'home',
          text: this.$t('layout.navigation.home'),
          route: { name: 'index' },
        },
        {
          icon: 'info',
          text: this.$t('layout.navigation.about'),
          route: { name: 'about' },
        },
        {
          icon: 'email',
          text: this.$t('layout.navigation.newsletter'),
          route: { name: 'newsletter' },
        },
        {
          icon: 'book',
          text: this.$t('layout.navigation.recipes'),
          route: { name: 'recipes' },
        },
        {
          icon: 'settings',
          text: this.$t('layout.navigation.settings'),
          route: { name: 'settings' },
        },
      ],
    };
  },
  computed: {
    isDark: function() {
      return this.$store.getters.getCurrentTheme().dark;
    },
  },
  head() {
    return {
      link: [this.$store.getters.getCurrentTheme()],
    };
  },
};
</script>

<style>
@import url('~/assets/css/font.css');

.brand {
  font-family: 'Comic Neue', sans-serif;
}

/* no pointer events */
.pointer-events-none {
  pointer-events: none;
}

/* navbar links no underline, can't add class to a element since it is added in js */
.text-decoration-none a {
  text-decoration: none !important;
}
</style>
