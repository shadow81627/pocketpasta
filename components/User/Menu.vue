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
        outlined
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
          <v-list-item avatar tile>
            <v-list-item-avatar>
              <img :src="$auth.user.picture" alt="avatar" class="rounded" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-if="$auth.user.name !== $auth.user.email">{{
                $auth.user.name
              }}</v-list-item-title>
              <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item @click="$auth.logout()">
          <v-btn icon>
            <v-icon>directions_run</v-icon>
          </v-btn>
          <v-list-item-title>{{ $t('layout.logout') }}</v-list-item-title>
        </v-list-item>
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
