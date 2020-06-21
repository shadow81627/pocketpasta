export default ({ $vuetify, $colorMode, store }) => {
  if (process.browser) {
    $vuetify.theme.dark = store.getters.getThemeById($colorMode.value).dark;
  }
};
