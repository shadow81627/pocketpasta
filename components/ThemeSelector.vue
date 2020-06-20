<template>
  <client-only>
    <b-form-select
      id="theme"
      v-model="currentTheme"
      name="theme"
      aria-label="theme"
    >
      <template slot="first">
        <option disabled value="">Please select a theme</option>
      </template>
      <option
        v-for="theme in $store.state.themes"
        :key="theme.value"
        :value="theme.value"
      >
        {{ capitalize(theme.value) }}
      </option>
    </b-form-select>
  </client-only>
</template>

<script>
export default {
  computed: {
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
    themeMeta() {
      return this.$store.state.themes.map((theme) => {
        const themeLink = {
          hid: `theme-${theme.value}`,
          href: theme.href,
          rel: 'stylesheet',
          as: 'style',
          skip:
            this.$store.getters.getThemeById(theme.value).href === '' ||
            !this.$store.getters.getThemeById(theme.value).href,
        };
        if (theme.value !== this.currentTheme) {
          themeLink.disabled = true;
          themeLink.rel = 'preload';
        }
        return themeLink;
      });
    },
  },
  methods: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  head() {
    return {
      link: [].concat(this.themeMeta),
    };
  },
};
</script>
