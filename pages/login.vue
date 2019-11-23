<template>
  <div class="container">
    <div>
      <h1>Login</h1>
      <!-- <code>{{ JSON.stringify($auth.user, null, 2) }}</code> -->
      <client-only>
        <auth />
      </client-only>
    </div>
  </div>
</template>

<script>
import Auth from '@/components/firebaseui/auth';
export default {
  middleware: ['auth'],
  auth: 'guest',
  components: {
    Auth,
  },
};
</script>
