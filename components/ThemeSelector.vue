<template>
  <form
    @submit.prevent="
      $auth.$storage.setUniversal('theme', $store.state.theme, true)
    "
  >
    <div class="form-group">
      <label for="theme">Theme</label>
      <select
        id="theme"
        v-model="currentTheme"
        name="theme"
        class="form-control"
      >
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
    </div>
    <button class="btn btn-primary">
      Save
    </button>
  </form>
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
  },
  head() {
    return {
      link: this.$store.state.themes.map((theme) => ({
        hid: `theme-${theme.value}`,
        disabled: 'disabled',
        href: theme.href,
        rel: 'preload',
        as: 'style',
      })),
    };
  },
};
</script>
