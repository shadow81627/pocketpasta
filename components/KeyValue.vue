<template>
  <p>
    <strong>{{ label }}:<span>&nbsp;</span></strong>
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
