<template>
  <v-btn
    v-show="deferredPrompt"
    aria-label="install app"
    v-bind="$attrs"
    icon
    @click="promptInstall"
  >
    <slot>
      <v-icon>{{ mdiDownload }}</v-icon>
    </slot>
  </v-btn>
</template>

<script>
import { mdiDownload } from '@mdi/js';
export default {
  inheritAttrs: false,
  data: () => {
    return { deferredPrompt: null, mdiDownload };
  },
  created() {
    // inspired by https://www.npmjs.com/package/vue-pwa-install
    const vm = this;
    vm.$on('canInstall', (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault();

      // Stash the event so it can be triggered later:
      vm.deferredPrompt = event;
    });
  },
  mounted() {
    if (window) {
      window.addEventListener('beforeinstallprompt', this.installHandler);
    }
  },
  destroyed() {
    if (window) {
      window.removeEventListener('beforeinstallprompt', this.installHandler);
    }
  },
  methods: {
    installHandler(event) {
      const vm = this;
      if (Boolean(event) && 'prompt' in event) {
        vm.$emit('canInstall', event);
      }
    },
    promptInstall() {
      const vm = this;
      // Show the prompt:
      vm.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt:
      vm.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          vm.$ga.event('App', 'Click', 'Download');
        } else {
          console.log('User dismissed the A2HS prompt');
        }

        vm.deferredPrompt = null;
      });
    },
  },
};
</script>
