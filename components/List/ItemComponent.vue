<template>
  <card v-bind="source" :type="source['@type']" :layout="view" />
</template>

<script>
import Card from '@/components/List/Card.vue';
export default {
  components: { Card },
  props: {
    index: {
      // index of current item
      type: Number,
    },
    view: { type: String },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
