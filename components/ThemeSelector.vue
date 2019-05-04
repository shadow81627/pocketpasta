<template>
  <select id="theme" v-model="currentTheme" name="theme" class="form-control">
    <option disabled value="">Please select a theme</option>
    <option
      v-for="theme in $store.state.themes"
      :key="theme.value"
      :value="theme.value"
      class="form-control"
    >
      {{ theme.value }}
    </option>
  </select>
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
