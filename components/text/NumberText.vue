<template>
  <span v-if="text">
    <span
      v-for="part in text.split(numberRegex)"
      :key="part"
      :class="{
        'font-weight-bold': part.search(numberRegex) !== -1,
      }"
      >{{ part }}</span
    ></span
  >
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      numberRegex: /(\d+)/g,
    };
  },
};
</script>
