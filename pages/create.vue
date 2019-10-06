<template>
  <div class="container-fluid">
    <h1>Create</h1>
    <form class="create-form" @submit="submit">
      <div class="form-group">
        <label class="form-label">Collection</label
        ><input
          v-model="collection"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label class="form-label">ID</label
        ><input v-model="id" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-label" for="data">Data</label>
        <b-form-textarea
          id="data"
          :value="formData"
          required
          :state="valid"
          class="overflow-hidden"
          @change.native="edit"
          @input.native="autoSize"
        />
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      collection: null,
      document: {},
      valid: true,
    };
  },
  computed: {
    formData: {
      set(val) {
        try {
          this.document = JSON.parse(val);
          this.id = this.document.id.toString();
          this.valid = true;
        } catch (error) {
          console.log(error);
          this.valid = false;
        }
      },
      get() {
        return JSON.stringify(this.document, null, 4);
      },
    },
  },
  // async asyncData(context) {
  //   const document = await context.app.$firebase.firestore
  //     .collection(this.collection)
  //     .doc(this.id)
  //     .get()
  //     .then(function(doc) {
  //       if (doc.exists) {
  //         console.log('Document data:', doc.data());
  //         return doc.data();
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log('No such document!');
  //         return {};
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log('Error getting document:', error);
  //     });
  //   return { document };
  // },
  methods: {
    edit(event) {
      this.formData = event.target.value;
      setTimeout(function() {
        event.target.style.height = 0;
        event.target.style.height = event.target.scrollHeight + 'px';
      });
    },
    autoSize(event) {
      setTimeout(function() {
        event.target.style.height = 0;
        event.target.style.height = event.target.scrollHeight + 'px';
      });
    },
    submit(event) {
      event.preventDefault();
      this.$firebase.firestore
        .collection(this.collection)
        .doc(this.id)
        .set(this.document);
    },
  },
};
</script>
