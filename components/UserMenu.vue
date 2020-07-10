<template>
  <div>
    <client-only>
      <v-menu v-model="menu" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="$auth.loggedIn"
            icon
            large
            aria-label="avatar"
            min-width="32"
            v-on="on"
          >
            <v-avatar size="32px" tile width="32" min-width="32">
              <v-img
                v-if="$auth.user.picture"
                :src="$auth.user.picture"
                width="32"
                height="32"
                min-width="32"
                alt="avatar"
              />
              <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
            </v-avatar>
          </v-btn>
          <v-btn v-else aria-label="login" outlined min-width="32" to="/login">
            <v-icon>{{ mdiAccountCircle }}</v-icon>
            <span>&nbsp;</span>
            <span>{{ $t('layout.login') }}</span>
          </v-btn>
        </template>

        <v-card v-if="$auth.loggedIn">
          <v-list>
            <v-list-item tile to="/profile">
              <v-list-item-avatar>
                <v-img
                  v-if="$auth.user.picture"
                  :src="$auth.user.picture"
                  alt="avatar"
                  class="rounded"
                  height="40"
                  width="40"
                />
                <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-if="$auth.user.name !== $auth.user.email"
                  >{{ $auth.user.name }}</v-list-item-title
                >
                <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list>
            <!-- <v-list-item>
              <v-btn icon>
                <v-icon>{{ mdiAccountGroup }}</v-icon>
              </v-btn>
              <v-list-item-title>Switch Company</v-list-item-title>
            </v-list-item> -->
            <v-list-item
              @click="currentTheme = $vuetify.theme.dark ? 'light' : 'dark'"
            >
              <v-btn icon>
                <v-icon>{{ mdiThemeLightDark }}</v-icon>
              </v-btn>
              <v-list-item-title>{{
                isDark ? 'Light Mode' : 'Dark Mode'
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$auth.logout()">
              <v-btn icon>
                <v-icon>{{ mdiLogout }}</v-icon>
              </v-btn>
              <v-list-item-title>{{ $t('layout.logout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn slot="placeholder" aria-label="login" outlined min-width="32">
        <v-icon>{{ mdiAccountCircle }}</v-icon>
        <span>&nbsp;</span>
        <span>{{ $t('layout.login') }}</span>
      </v-btn>
    </client-only>
  </div>
</template>

<script>
import {
  mdiAccountCircle,
  mdiLogout,
  mdiThemeLightDark,
  mdiAccountGroup,
} from '@mdi/js';
export default {
  data: () => ({
    menu: false,
    mdiAccountCircle,
    mdiLogout,
    mdiThemeLightDark,
    mdiAccountGroup,
  }),
  computed: {
    isDark() {
      return this.$store.getters.getThemeById(this.currentTheme).dark;
    },
    currentTheme: {
      get() {
        return this.$colorMode.value;
      },
      set(value) {
        this.$colorMode.preference = value;
        // timeout required to wait for color mode to be set.
        setTimeout(
          () =>
            (this.$vuetify.theme.dark = this.$store.getters.getThemeById(
              this.$colorMode.value,
            ).dark),
          100,
        );
      },
    },
  },
};
</script>
