<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-if="$auth.loggedIn" icon large aria-label="avatar" v-on="on">
        <v-avatar size="32px" tile>
          <!-- https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5?s=32&d=wavatar&r=pg -->
          <img
            v-if="$auth.user.picture"
            :src="$auth.user.picture"
            width="32"
            height="32"
            class="rounded"
            alt="avatar"
            onerror="javascript:this.style.display = 'none !important'"
          />
        </v-avatar>
      </v-btn>
      <v-btn v-else aria-label="login" @click="$auth.loginWith('auth0')">
        Login
      </v-btn>
    </template>

    <v-card v-if="$auth.loggedIn">
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="$auth.user.picture" alt="avatar" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ $auth.user.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-tile @click="$auth.logout()">
          <v-btn icon>
            <v-icon>directions_run</v-icon>
          </v-btn>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    menu: false,
  }),
  async fetch(context) {
    await context.app.$auth.fetchUser();
  },
};
</script>
