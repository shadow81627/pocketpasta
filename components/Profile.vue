<template>
  <v-list v-if="$auth.loggedIn || $auth.user">
    <h1>Profile</h1>
    <v-list-item>
      <v-list-item-avatar>
        <b-img-lazy :src="$auth.user.picture" alt="avatar" class="rounded" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-if="$auth.user.name !== $auth.user.email">{{
          $auth.user.name
        }}</v-list-item-title>
        <v-list-item-title>{{ $auth.user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <div v-else>
    Not logged in <nuxt-link :to="localePath('login')">Login</nuxt-link>
  </div>
</template>
