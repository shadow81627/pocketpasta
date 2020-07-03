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
