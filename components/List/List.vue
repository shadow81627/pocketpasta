<template>
  <div>
    <h1>{{ heading }}</h1>
    <div class="row justify-content-end">
      <ViewSwitcher v-model="layout" />
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-layout" :class="layoutClass">
          <Card
            v-for="item in list"
            :key="item.id"
            v-bind="item"
            :layout="layout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewSwitcher from '@/components/List/ViewSwitcher';
import Card from '@/components/List/Card';
export default {
  components: {
    ViewSwitcher,
    Card,
  },
  props: {
    heading: { type: String, default: '' },
    list: { type: Array, default: () => [] },
    layout: { type: String, default: null },
  },
  computed: {
    layoutClass() {
      // list layout is no class
      return {
        'card-group': this.layout === 'group',
        'card-deck': this.layout === 'deck',
        'card-columns': this.layout === 'columns',
      };
    },
  },
};
</script>
