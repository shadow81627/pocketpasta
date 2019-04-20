export default function(context) {
  try {
    let theme;
    if (context.route.query.theme) {
      theme =
        context.store.getters.getThemeById(context.route.query.theme) ||
        context.store.state.theme;
    } else {
      theme = context.app.$auth.$storage.syncUniversal(
        'theme',
        context.store.state.theme,
        true,
      );
    }
    context.store.commit('setTheme', theme);
  } catch (error) {
    console.log('cant get theme');
    console.log(error);
  }
}
