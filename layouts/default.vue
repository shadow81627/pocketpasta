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
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <nuxt-link :to="localePath(item.route ? item.route : {})">{{
                  item.text
                }}</nuxt-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
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
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      /> -->
      <v-spacer />
      <AddToHomeScreen icon />
      <!-- <v-btn icon aria-label="apps">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn
        icon
        aria-label="notifications"
      >
        <v-icon>notifications</v-icon>
      </v-btn> -->
      <LangSwitcher />
      <UserMenu />
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
    <!-- <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn> -->
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title"
          >Create contact</v-card-title
        >
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt
                  />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" placeholder="Company" />
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title" />
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email" />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes" />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer />
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        // { icon: 'contacts', text: 'Contacts' },
        // { icon: 'history', text: 'Frequently contacted' },
        // { icon: 'content_copy', text: 'Duplicates' },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'Labels',
        //   model: true,
        //   children: [{ icon: 'add', text: 'Create label' }],
        // },
        // {
        //   icon: 'keyboard_arrow_up',
        //   'icon-alt': 'keyboard_arrow_down',
        //   text: 'More',
        //   model: false,
        //   children: [
        //     { text: 'Import' },
        //     { text: 'Export' },
        //     { text: 'Print' },
        //     { text: 'Undo changes' },
        //     { text: 'Other contacts' },
        //   ],
        // },
        {
          icon: 'settings',
          text: this.$t('layout.navigation.settings'),
          route: { name: 'settings' },
        },
        // { icon: 'chat_bubble', text: 'Send feedback' },
        // { icon: 'help', text: 'Help' },
        // { icon: 'phonelink', text: 'App downloads' },
        // { icon: 'keyboard', text: 'Go to the old version' },
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
</style>
