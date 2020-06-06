<template>
  <div class="container">
    <list
      v-bind="{
        heading: $t('recipes.heading'),
        layout: 'list',
        collection: 'recipes',
      }"
    />
  </div>
</template>

<script>
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Easy pasta recipes made with simple ingredients.',
        },
      ],
      link: [],
    };
  },
};
</script>
