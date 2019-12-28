<template>
  <span v-if="Array.isArray(text.split(fractionsRegex))">
    <span
      v-for="part in text.split(fractionsRegex)"
      :key="part"
      :class="{
        frac: part.search(fractionsRegex) !== -1,
        'font-weight-bold':
          part.search(/^\d+$/) !== -1 || part.search(fractionsRegex) !== -1,
      }"
      >{{ part }}</span
    ></span
  >
  <span v-else>{{ text }}</span>
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
      fractionsRegex: /([1-9][0-9]*\/[1-9][0-9]*)/g,
    };
  },
};
</script>
