<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <v-icon small>translate</v-icon>
        <span>&nbsp;</span>
        <span>{{ currentLocale.name }}</span>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile v-for="locale in availableLocales" :key="locale.code">
        <v-list-tile-title
          ><nuxt-link :to="switchLocalePath(locale.code)">{{
            locale.name
          }}</nuxt-link></v-list-tile-title
        >
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },
  },
};
</script>

<style></style>
