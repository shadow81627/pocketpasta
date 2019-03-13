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
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
