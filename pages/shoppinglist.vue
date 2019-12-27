<template>
  <div class="container">
    <editor v-model="document" @submit="save" @input="debouncedSave" />
  </div>
</template>

<script>
import Editor from '~/components/Editor';

const debounce = require('lodash/debounce');

export default {
  middleware: ['auth'],
  components: {
    Editor,
  },
  async asyncData(context) {
    if (context.$auth.user.uid) {
      const document = await context.app.$firebase.firestore
        .collection('shoppinglists')
        .doc(context.$auth.user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            return doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function(error) {
          console.error('Error getting document: ', error);
        });

      return { document };
    }
  },
  data() {
    return {
      document: {},
    };
  },
  methods: {
    save() {
      const vm = this;

      vm.$firebase.firestore
        .collection('shoppinglists')
        .doc(vm.$auth.user.uid)
        .set(vm.document)
        .then(function() {
          // const Delta = vm.editor.import('delta');
          // vm.change = new Delta();
        })
        .catch(function(error) {
          console.error('Error writing document: ', error);
        });
    },
    debouncedSave() {
      debounce(this.save, 5000);
    },
  },
};
</script>
