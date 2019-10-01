<template>
  <v-list>
    <v-list-tile avatar>
      <v-list-tile-avatar tile>
        <b-img-lazy :src="$auth.user.picture" alt="avatar" class="rounded" />
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-if="$auth.user.name !== $auth.user.email">{{
          $auth.user.name
        }}</v-list-tile-title>
        <v-list-tile-title>{{ $auth.user.email }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

  <v-list v-else-if="$store.state.user">
    <v-list-item avatar>
      <v-list-item-avatar>
        <b-img-lazy
          :src="$store.state.user.photoURL"
          alt="avatar"
          class="rounded"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-if="$store.state.user.displayName !== $store.state.user.email"
          >{{ $store.state.user.displayName }}</v-list-item-title
        >
        <v-list-item-title>{{ $store.state.user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <div v-else>
    Not logged in <nuxt-link :to="localePath('login')">Login</nuxt-link>
  </div>
</template>
