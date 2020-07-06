<template>
  <v-container>
    <list
      v-bind="{
        heading: 'Organizations',
        layout: 'list',
        collection: 'organizations',
      }"
    />
  </v-container>
</template>

<script>
import List from '@/components/List/List';
export default {
  components: {
    List,
  },
};
</script>
