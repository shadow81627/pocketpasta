export default function(context) {
  const theme = context.app.$auth.$storage.getUniversal('theme', true);
  console.log(theme);
  context.store.commit(
    'setTheme',
    context.app.$auth.$storage.getUniversal('theme', true),
  );
}
