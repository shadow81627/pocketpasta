export default class CustomScheme {
  constructor(auth, options) {
    this.$auth = auth;
    this.name = options._name;

    this.options = Object.assign({}, DEFAULTS, options);
  }

  mounted() {
    // Handle callbacks on page load
    const handled = this._handleCallback();
    if (handled) {
      return this.$auth.fetchUserOnce();
    }
    return this.$auth.fetchUserOnce();
  }

  async login() {
    // Ditch any leftover local tokens before attempting to log in
    await this._logoutLocally();

    await this.$auth.redirect('login', false);

    return this.fetchUser();
  }

  async setUserToken() {
    // Ditch any leftover local tokens before attempting to log in
    await this._logoutLocally();

    return this.fetchUser();
  }

  async fetchUser() {
    const stringUser = await JSON.parse(
      JSON.stringify(this.$auth.ctx.app.$firebase.auth().currentUser),
    );
    return this.$auth.setUser({
      name: stringUser.displayName,
      picture: stringUser.photoURL,
      ...stringUser,
    });
  }

  _handleCallback(uri) {
    // Handle callback only for specified route
    if (
      this.$auth.options.redirect &&
      this.$auth.ctx.route.path !== this.$auth.options.redirect.callback
    ) {
      return false;
    } else {
      return true;
    }
  }

  async logout() {
    await this.$auth.ctx.app.$firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log('logged out');
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });

    // But logout locally regardless
    return this._logoutLocally();
  }

  _logoutLocally() {
    return this.$auth.reset();
  }
}

const DEFAULTS = {
  tokenRequired: true,
  tokenType: 'Bearer',
  globalToken: false,
  tokenName: 'Authorization',
};
