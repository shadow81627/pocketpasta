<template>
  <div>
    <slot name="custom-toolbar" />
    <slot name="content" />
  </div>
</template>

<script>
import Quill from 'quill';

export default {
  props: {
    placeholder: {
      type: String,
      default: 'type something great',
    },
    toolbar: {
      type: Array,
      default: () => [['bold', 'italic', 'blockquote', 'code', 'list']],
    },
  },
  mounted() {
    const customToolbar = this.$slots['custom-toolbar'];
    const customToolbarHTML = customToolbar ? customToolbar[0].elm : false;
    const quillCustomToolbarId = 'custom-quilljs-toolbar';
    if (customToolbarHTML) {
      customToolbarHTML.id = quillCustomToolbarId;
    }
    const quill = new Quill(this.$el, {
      theme: 'snow',
      placeholder: this.placeholder,
      modules: {
        toolbar: this.toolbar,
      },
    });

    quill.on('text-change', (delta, oldDelta, source) => {
      const html = quill.root.innerHTML;
      this.$emit('change', html, delta, oldDelta, source);
    });
  },

  methods: {
    textChanged(html, delta) {
      // console.log('text changed', html, delta);
    },
  },
};
</script>
