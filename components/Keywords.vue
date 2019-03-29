<template>
  <ul class="list-inline">
    <strong>{{ label }}:</strong>
    <li v-for="tag in tags" :key="tag" class="list-inline-item tags">
      {{ tag }}
    </li>
  </ul>
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
  computed: {
    keywords() {
      return this.tags.join(',');
    },
  },
  head() {
    return {
      meta: [{ hid: 'keywords', name: 'keywords', content: this.keywords }],
    };
  },
};
</script>

<style>
.tags {
  background: #1abc9c;
  border-radius: 2px;
  color: #f5f5f5;
  font-weight: bold;
  padding: 2px 4px;
  margin-bottom: 0.5rem;
}
</style>
