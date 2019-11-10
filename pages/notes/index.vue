<template>
  <div class="container">
    <list v-bind="{ heading: $t('notes.heading'), list, layout: 'columns' }" />
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      :to="`${this.$route.path}/create`"
      class="hidden-print-only"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import List from '@/components/List/List';
export default {
  middleware: 'auth',
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
          content: 'Write stuff down with PocketPasta notes.',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/notes',
        },
      ],
    };
  },
};
</script>
