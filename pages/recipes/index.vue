<template>
  <list
    v-bind="{
      heading: $t('recipes.heading'),
      layout: 'list',
      collection: 'recipes',
    }"
  />
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
    };
  },
};
</script>
