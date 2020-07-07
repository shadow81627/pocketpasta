<template>
  <div class="container">
    <div>
      <h1>Login</h1>
      <div id="firebaseui-auth-container" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  auth: 'guest',
  data() {
    return { ui: null };
  },
  mounted() {
    if (process.client) {
      const firebaseui = require('firebaseui');
      if (!this.ui) {
        this.ui = new firebaseui.auth.AuthUI(this.$fireAuth);
      }
      // Initialize the FirebaseUI Widget using Firebase.
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(this.$fireAuth);
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/profile',
        signInOptions: [
          {
            provider: this.$fireAuthObj.EmailAuthProvider.PROVIDER_ID,
            signInMethod: this.$fireAuthObj.EmailAuthProvider
              .EMAIL_LINK_SIGN_IN_METHOD,
            requireDisplayName: false,
          },
          this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
      });
    }
  },
  head() {
    return {
      link: [
        {
          type: 'text/css',
          rel: 'stylesheet',
          href: 'https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css',
        },
      ],
    };
  },
};
</script>
