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
    label: { type: String, default: 'Skills' },
    tags: {
      type: Array,
      default: () => {
        return ['html5', 'css3', 'jquery', 'bootstrap4'];
      },
    },
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
