<template>
  <v-menu>
    <template #activator="{ on }">
      <v-btn outlined v-on="on">
        <v-icon small>$translate</v-icon>
        <span>&nbsp;</span>
        <span>{{ currentLocale.name }}</span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="locale in availableLocales" :key="locale.code">
        <v-list-item-title
          ><nuxt-link :to="switchLocalePath(locale.code)">{{
            locale.name
          }}</nuxt-link></v-list-item-title
        >
      </v-list-item>
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
