export default function(context) {
  const theme = context.app.$auth.$storage.getUniversal('theme', true);
  context.store.commit('setTheme', theme);
}
