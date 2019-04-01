<template>
  <div id="vue">
    <no-ssr placeholder="loading...">
      <quill
        placeholder="this is good"
        :toolbar="[['bold', 'underline']]"
        @change="textChanged"
      >
        <div slot="content">
          <p>Hello World!</p>
          <p>Some initial <strong>bold</strong> text</p>
          <p><br /></p>
        </div>
      </quill>
    </no-ssr>
  </div>
</template>

<script>
export default {
  components: {
    Quill: () => import('@/components/Quill'),
  },
};
</script>
