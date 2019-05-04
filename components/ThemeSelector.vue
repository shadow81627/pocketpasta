<template>
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
      {{ theme.value }}
    </option>
  </b-form-select>
</template>

<script>
export default {
  computed: {
    currentTheme: {
      get() {
        return this.$store.state.theme.value;
      },
      set(value) {
        this.$store.commit('setTheme', this.$store.getters.getThemeById(value));
      },
    },
    themeMeta: function() {
      return this.$store.state.themes.map((theme) => {
        const themeLink = {
          hid: `theme-${theme.value}`,
          href: theme.href,
          rel: 'stylesheet',
          as: 'style',
        };
        if (theme.value !== this.currentTheme) {
          themeLink.disabled = true;
          themeLink.rel = 'preload';
        }
        return themeLink;
      });
    },
  },
  head() {
    return {
      link: [].concat(this.themeMeta),
    };
  },
};
</script>
