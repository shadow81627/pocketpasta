<template>
  <div class="container">
    <div
      v-quill:myQuillEditor="[
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
      ]"
    >
      <Recipe />
    </div>
  </div>
</template>

<script>
import Recipe from '@/components/Recipe/Recipe';

export default {
  components: {
    Recipe,
  },
  data() {
    return { id: this.$route.params.id };
  },
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://pocketpasta.com/recipes/detail/${this.id}/edit`,
        },
      ],
    };
  },
};
</script>
