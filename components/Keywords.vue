<template>
  <div>
    <strong v-if="label" class="tag pl-0 font-weight-bold">{{ label }}:</strong>
    <v-chip-group class="d-inline" column>
      <v-chip v-for="tag in tags" :key="tag" color="primary" label
        >{{ tag.trim() }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: 'Tags' },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  head() {
    return {
      meta: [{ hid: 'keywords', name: 'keywords', content: this.keywords }],
    };
  },
  computed: {
    keywords() {
      return this.tags.join(',');
    },
  },
};
</script>
