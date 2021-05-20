export default ({ $vuetify, $colorMode, store }) => {
  if (process.browser) {
    setTimeout(() => {
      $vuetify.theme.dark = store.getters.getThemeById($colorMode.value).dark;
    }, 0);
  }
};
