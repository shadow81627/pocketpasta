<template>
  <div class="container">
    <List
      v-bind="{
        heading: 'Search',
        layout: 'list',
        collection: '',
        deep: true,
        fetchOnServer: true,
        defaultLimit: -1,
        infinite: false,
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
};
</script>
