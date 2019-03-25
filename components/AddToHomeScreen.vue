<template>
  <v-btn v-if="display" icon aria-label="get app">
    <v-icon>get_app</v-icon>
  </v-btn>
</template>

<script>
export default {
  data: () => {
    return { display: false, deferredPrompt: {} };
  },
  created: function() {
    const vm = this;
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        // e.preventDefault();
        // Stash the event so it can be triggered later.
        vm.deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        // this.$el.style.display = 'block';
        vm.display = true;

        vm.$el.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          // this.$el.style.display = 'none';
          vm.display = false;
          // Show the prompt
          vm.deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          vm.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              // console.log('User accepted the A2HS prompt');
            } else {
              // console.log('User dismissed the A2HS prompt');
            }
            vm.deferredPrompt = null;
          });
        });
      });
    }
  },
};
</script>
