export default function(context) {
  const theme = context.app.$auth.$storage.syncUniversal(
    'theme',
    context.store.state.theme,
    true,
  );
  context.store.commit('setTheme', theme);
}
