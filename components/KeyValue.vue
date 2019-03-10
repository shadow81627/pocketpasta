<template>
  <p>
    <strong>{{ label }}:</strong>
    <span>{{ value }}</span>
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    value: {
      type: String,
    },
  },
};
</script>
