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
  async asyncData(context) {
    let list = await context.app.$firebase.firestore
      .collection('recipes')
      .get()
      .then(function(querySnapshot) {
        return querySnapshot.docs.map((doc) => doc.data());
      });

    // Thanks for the array merge function
    // https://codeburst.io/javascript-array-distinct-5edc93501dc4
    list = [...context.store.state.recipes, ...list];
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
      link: [],
    };
  },
};
</script>
