<template>
  <v-container>
    <v-row>
      <v-col>
        <editor
          v-model="document"
          :loading="loading"
          @submit="debouncedSave"
          @input="debouncedInput"
        />
      </v-col>
    </v-row>
  </v-container>
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
      const document = await context.app.$fireStore
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
        .catch(function (error) {
          console.error('Error getting document: ', error);
        });

      return { document };
    }
  },
  data() {
    return {
      document: {},
      loading: false,
    };
  },
  methods: {
    save() {
      const vm = this;
      vm.loading = true;

      vm.$fireStore
        .collection('shoppinglists')
        .doc(vm.$auth.user.uid)
        .set(vm.document)
        .then(function () {
          // const Delta = vm.editor.import('delta');
          // vm.change = new Delta();
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        })
        .finally(function () {
          vm.loading = false;
        });
    },
    debouncedSave: debounce(
      function (e) {
        console.log('save');
        this.save();
      },
      1000,
      { leading: true, trailing: false, maxWait: 1000 },
    ),
    debouncedInput: debounce(function (e) {
      console.log('save');
      this.save();
    }, 5000),
  },
};
</script>
