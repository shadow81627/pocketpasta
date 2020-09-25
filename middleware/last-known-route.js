// https://css-tricks.com/storing-and-using-the-last-known-route-in-vue/
export default function ({ route, $warehouse, app, redirect }) {
  if (process.client) {
    const LS_ROUTE_KEY = 'last_known_route';
    const lastRoute = $warehouse.get(LS_ROUTE_KEY);
    const shouldRedirect = Boolean(
      route.path === app.localePath('index') &&
        lastRoute &&
        lastRoute !== route.path,
    );
    // save current route
    $warehouse.set(LS_ROUTE_KEY, route.path);
    if (shouldRedirect) {
      window.onNuxtReady(() => {
        window.$nuxt.$router.push(lastRoute);
      });
      // app.router.push(lastRoute);
      // return redirect(lastRoute);
    }
  }
}
