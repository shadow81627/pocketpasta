<template>
  <div class="list-inline">
    <strong class="btn tag pl-0 font-weight-bold">{{ label }}:</strong>
    <a
      v-for="tag in tags"
      :key="tag"
      href="#"
      class="list-inline-item btn tag btn-primary"
      role="button"
      >{{ tag.trim() }}
    </a>
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
.tag {
  border-radius: 2px;
  font-weight: bold;
  padding: 2px 4px;
  margin-bottom: 0.5rem;
}
</style>
