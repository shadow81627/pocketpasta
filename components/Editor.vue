<template>
  <div>
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
    <div class="mt-3">
      <v-btn @click="clear">Clear</v-btn>
      <v-btn
        class="float-right"
        color="primary"
        :loading="loading"
        @click="save"
        >Save</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      document: {},
      editor: null,
      change: null,
    };
  },

  mounted() {
    const vm = this;

    const Quill = require('quill');
    const Delta = Quill.import('delta');

    vm.change = new Delta();
    vm.document = vm.value;

    // raw svg inline because nuxt wants to base64 them, which doesn't work as HTML
    const icons = Quill.import('ui/icons');
    icons.undo = `<svg viewbox="0 0 18 18">
  <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
  <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
</svg>`;
    icons.redo = `<svg viewbox="0 0 18 18">
  <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
  <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
</svg>`;

    const editor = new Quill('#editor', {
      modules: {
        toolbar: {
          container: [
            ['undo', 'redo'],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['link', 'blockquote', 'image'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'],
          ],
          handlers: {
            redo() {
              vm.editor.history.redo();
            },
            undo() {
              vm.editor.history.undo();
            },
          },
        },
      },
      history: {
        delay: 1000,
        maxStack: 100,
        userOnly: false,
      },
      theme: 'snow',
    });

    editor.setContents(vm.document);
    vm.editor = editor;
    // Store accumulated changes
    editor.on('text-change', function (delta) {
      vm.change = vm.change.compose(delta);
      vm.save();
      vm.$emit('input', vm.document);
    });

    // Check for unsaved data
    window.onbeforeunload = function () {
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
      }
      vm.$emit('submit');
    },
    clear() {
      this.editor.setContents([]);
      this.$emit('reset');
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

.ql-undo {
  background: no-repeat scroll 50% 50% transparent !important;
  background-image: url('~quill/assets/icons/undo.svg') !important;
  text-align: center;

  color: purple;
}

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

.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke,
.ql-snow.ql-toolbar button:focus .ql-stroke,
.ql-snow .ql-toolbar button:focus .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button:hover .ql-stroke-miter,
.ql-snow .ql-toolbar button:hover .ql-stroke-miter,
.ql-snow.ql-toolbar button:focus .ql-stroke-miter,
.ql-snow .ql-toolbar button:focus .ql-stroke-miter,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
  stroke: #4dba87;
}

.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill,
.ql-snow.ql-toolbar button:focus .ql-fill,
.ql-snow .ql-toolbar button:focus .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
  fill: #4dba87;
}

span.ql-picker-label::before {
  color: #4dba87;
}

.ql-editor ul > li {
  font-size: 24px;
}
</style>
