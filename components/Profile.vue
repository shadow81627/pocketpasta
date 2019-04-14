<template>
  <v-list>
    <v-list-tile avatar>
      <v-list-tile-avatar tile>
        <img :src="$auth.user.picture" alt="avatar" class="rounded" />
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-if="$auth.user.name !== $auth.user.email">{{
          $auth.user.name
        }}</v-list-tile-title>
        <v-list-tile-title>{{ $auth.user.email }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
