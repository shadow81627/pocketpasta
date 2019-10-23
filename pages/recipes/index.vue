<template>
  <div class="container">
    <list v-bind="{ heading: $t('recipes.heading'), list, layout: 'list' }" />
  </div>
</template>

<script>
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
  data: () => ({ list: [] }),
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Easy pasta recipes made with simple ingredients.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/recipes',
        },
      ],
    };
  },
  async asyncData(context) {
    const list = await context.app.$firebase.firestore
      .collection('recipes')
      .get()
      .then(function(querySnapshot) {
        return querySnapshot.docs.map((doc) => doc.data());
      });

    // Thanks for the array merge function
    // https://codeburst.io/javascript-array-distinct-5edc93501dc4
    list.push(context.store.state.recipes);
    const result = [];
    const map = new Map();
    for (const item of list) {
      if (!map.has(item.id)) {
        map.set(item.id, true); // set any value to Map
        result.push(item);
      }
    }

    return { list: result };
  },
};
</script>
