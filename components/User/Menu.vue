<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-if="$auth.loggedIn" icon large aria-label="avatar" v-on="on">
        <v-avatar size="32px" tile>
          <img
            v-if="$auth.user.picture"
            :src="$auth.user.picture"
            width="32"
            height="32"
            class="rounded"
            alt="avatar"
            onerror="javascript:this.style.display = 'none'"
          />
        </v-avatar>
      </v-btn>
      <v-btn
        v-else
        aria-label="login"
        outline
        @click="$auth.loginWith('auth0')"
      >
        <v-icon>account_circle</v-icon>
        <span>&nbsp;</span>
        <span>{{ $t('layout.login') }}</span>
      </v-btn>
    </template>

    <v-card v-if="$auth.loggedIn">
      <v-list>
        <nuxt-link to="/profile">
          <v-list-tile avatar tile>
            <v-list-tile-avatar>
              <img :src="$auth.user.picture" alt="avatar" class="rounded" />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-if="$auth.user.name !== $auth.user.email">{{
                $auth.user.name
              }}</v-list-tile-title>
              <v-list-tile-title>{{ $auth.user.email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </nuxt-link>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-tile @click="$auth.logout()">
          <v-btn icon>
            <v-icon>directions_run</v-icon>
          </v-btn>
          <v-list-tile-title>{{ $t('layout.logout') }}</v-list-tile-title>
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
};
</script>
