<template>
  <div class="container">
    <div>
      <h1>Login</h1>
      <!-- <code>{{ JSON.stringify($auth.user, null, 2) }}</code> -->
      <div id="firebaseui-auth-container" />
    </div>
  </div>
</template>

<script>
const firebaseui = require('firebaseui');

export default {
  mounted() {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(this.$firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/profile',
      signInOptions: [
        {
          provider: this.$firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: this.$firebase.auth.EmailAuthProvider
            .EMAIL_LINK_SIGN_IN_METHOD,
          requireDisplayName: false,
        },
        this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });
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
