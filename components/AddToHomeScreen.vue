<template>
  <v-btn icon aria-label="get app" :class="{ 'd-none': display }">
    <v-icon>get_app</v-icon>
  </v-btn>
</template>

<script>
/* eslint-disable no-console */
export default {
  data: () => {
    return { display: false, deferredPrompt: {} };
  },
  mounted: function() {
    const vm = this;
    if (process.client) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        // e.preventDefault();
        // Stash the event so it can be triggered later.
        vm.deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        vm.display = true;

        vm.$el.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          vm.display = false;
          // Show the prompt
          vm.deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          vm.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            vm.deferredPrompt = null;
          });
        });
      });
    }
  },
};
</script>
