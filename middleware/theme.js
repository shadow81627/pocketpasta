export default function(context) {
  try {
    const theme = context.app.$auth.$storage.syncUniversal(
      'theme',
      context.store.state.theme,
      true,
    );
    context.store.commit('setTheme', theme);
  } catch (error) {
    console.log('cant get theme');
    console.log(error);
  }
}
