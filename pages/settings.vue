<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Settings</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h2>Database</h2>
          </v-card-title>
          <v-card-subtitle>Apache CouchDB Settings</v-card-subtitle>
          <v-container class="pt-0">
            <v-row>
              <v-col cols="12" class="align-self-center">
                <v-text-field v-model="dbRemote" label="Remote URL" />
              </v-col>
              <v-col cols="12" sm="6" class="align-self-center">
                <v-text-field v-model="dbUsername" label="Username" />
              </v-col>
              <v-col cols="12" sm="6" class="align-self-center">
                <v-text-field
                  v-model="dbPassword"
                  label="Password"
                  type="password"
                  autocomplete="one-time-code"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const dbRemote = useCookie('dbRemote');
const dbUsername = useCookie('dbUsername');
const dbPassword = useCookie('dbPassword');
</script>
