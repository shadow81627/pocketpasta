<template>
  <List
    v-bind="{
      heading: 'Recipes',
      layout: 'columns',
      collection: 'recipes',
    }"
  ></List>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Easy pasta recipes made with simple ingredients.",
        },
      ],
    };
  },
};
</script>
