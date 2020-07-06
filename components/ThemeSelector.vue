<template>
  <client-only>
    <v-select
      id="theme"
      v-model="currentTheme"
      name="theme"
      label="Theme"
      :items="items"
    />
  </client-only>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.themes.map(({ value }) => ({
        text: this.capitalize(value),
        value,
      }));
    },
    currentTheme: {
      get() {
        return this.$colorMode.preference;
      },
      set(value) {
        this.$colorMode.preference = value;
        // timeout required to wait for color mode to be set.
        setTimeout(
          () =>
            (this.$vuetify.theme.dark = this.$store.getters.getThemeById(
              this.$colorMode.value,
            ).dark),
          100,
        );
      },
    },
  },
  methods: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
