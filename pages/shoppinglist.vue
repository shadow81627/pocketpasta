<template>
  <div class="container">
    <div id="editor">
      <h1>Shopping list</h1>
      <br />

      <h2>Breakfast:</h2>
      <ul data-checked="false">
        <li>Milk</li>
        <li>Bananas</li>
      </ul>
      <br />

      <h2>Misc:</h2>
      <ul data-checked="false">
        <li>canola oil</li>
        <li>apple cider vinegar</li>
        <li>vinegar</li>
        <li>baking soda</li>
        <li>toothpaste</li>
        <li>toilet paper</li>
        <li>dish soap</li>
        <li>snacks</li>
      </ul>
      <br />

      <h2>Thursday: DND cookup</h2>
      <ul data-checked="false">
        <li>macaroni</li>
        <li>potato</li>
        <li>carrot</li>
        <li>broccoli</li>
        <li>cauliflower</li>
        <li>kale</li>
      </ul>
      <br />

      <h2>Friday: soup leftovers</h2>
      <ul data-checked="false">
        <li>macaroni</li>
        <li>potato</li>
        <li>carrot</li>
        <li>broccoli</li>
        <li>cauliflower</li>
        <li>kale</li>
      </ul>
      <br />

      <h2>Saturday: fish and chips</h2>
      <ul data-checked="false">
        <li>fish</li>
        <li>chips</li>
      </ul>
      <br />

      <h2>Sunday: tacos</h2>
      <ul data-checked="false">
        <li>tortillas</li>
        <li>tomato</li>
        <li>avocado</li>
        <li>garlic</li>
        <li>tofu</li>
        <li>parsley</li>
      </ul>
      <br />

      <h2>Monday: Ethiopian</h2>
      <ul data-checked="false">
        <li>red onion</li>
        <li>sweet potato</li>
        <li>walnuts</li>
        <li>spinach</li>
        <li>feta</li>
      </ul>
      <br />

      <h2>Tuesday: chickpea curry</h2>
      <ul data-checked="false">
        <li>chickpeas</li>
        <li>ginger</li>
        <li>garlic</li>
        <li>spinach</li>
      </ul>
      <br />

      <h2>Wednesday: chickpea curry</h2>
      <ul data-checked="false">
        <li>chickpeas</li>
        <li>ginger</li>
        <li>garlic</li>
        <li>spinach</li>
      </ul>
      <br />
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
const debounce = require('lodash/debounce');
const Delta = Quill.import('delta');
export default {
  middleware: 'auth',
  data() {
    return {
      document: {},
      editor: null,
      change: new Delta(),
    };
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

  mounted() {
    const vm = this;
    const debouncedSave = debounce(vm.save, 500);
    const editor = new Quill('#editor', {
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        ],
      },
      theme: 'snow',
    });

    editor.setContents(vm.document);
    vm.editor = editor;
    // Store accumulated changes
    editor.on('text-change', function(delta) {
      vm.change = vm.change.compose(delta);
      debouncedSave();
    });

    // Check for unsaved data
    window.onbeforeunload = function() {
      if (vm.change.length() > 0) {
        return 'There are unsaved changes. Are you sure you want to leave?';
      }
    };
  },

  methods: {
    save() {
      const vm = this;
      if (vm.change && vm.change.length() > 0) {
        vm.document = JSON.parse(JSON.stringify(vm.editor.getContents()));

        vm.$firebase.firestore
          .collection('shoppinglists')
          .doc(vm.$auth.user.uid)
          .set(vm.document)
          .then(function() {
            vm.change = new Delta();
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.

    const vm = this;
    if (vm.change.length() > 0) {
      const answer = window.confirm(
        'Do you really want to leave? you have unsaved changes!',
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
};
</script>

<style>
@import '~/node_modules/quill/dist/quill.core.css';
@import '~/node_modules/quill/dist/quill.bubble.css';
@import '~/node_modules/quill/dist/quill.snow.css';

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: #e0611d;
}

.ql-snow .ql-stroke {
  stroke: #e0611d;
}

.ql-snow .ql-picker {
  color: #e0611d;
}
</style>
