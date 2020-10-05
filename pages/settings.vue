<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('settings.heading') }}</h1>
      </v-col>
    </v-row>

    <!-- <v-expansion-panels multiple accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          header
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          content
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          header
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          content
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> -->

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h2>
              {{ $t('settings.style.heading') }}
            </h2>
          </v-card-title>

          <setting v-bind="$t('settings.style.theme-label')">
            <theme-selector aria-labelledby="theme-label" />
          </setting>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h2>
              {{ $t('settings.content.heading') }}
            </h2>
          </v-card-title>
          <setting v-bind="$t('settings.content.language')">
            <lang-switcher />
          </setting>
        </v-card>
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

<script>
import ThemeSelector from '@/components/ThemeSelector.vue';
import LangSwitcher from '@/components/Layout/LangSwitcher';
import setting from '@/components/settings/setting';

export default {
  components: {
    ThemeSelector,
    LangSwitcher,
    setting,
  },
  computed: {
    dbRemote: {
      get() {
        return this.$warehouse.get('dbRemote') || this.$config.DB_REMOTE;
      },
      set(value) {
        this.$warehouse.set('dbRemote', value);
      },
    },
    dbUsername: {
      get() {
        return this.$warehouse.get('dbUsername') || this.$config.DB_USERNAME;
      },
      set(value) {
        this.$warehouse.set('dbUsername', value);
      },
    },
    dbPassword: {
      get() {
        return this.$warehouse.get('dbPassword') || this.$config.DB_PASSWORD;
      },
      set(value) {
        this.$warehouse.set('dbPassword', value);
      },
    },
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/settings',
        },
      ],
    };
  },
};
</script>
