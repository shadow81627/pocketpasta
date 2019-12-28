<template>
  <span
    v-if="
      Array.isArray(text.split(fractionsRegex)) &&
        text.split(fractionsRegex).length > 1
    "
  >
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
  <span v-else-if="Array.isArray(text.split(numberRegex))">
    <span
      v-for="part in text.split(numberRegex)"
      :key="part"
      :class="{
        'font-weight-bold': part.search(numberRegex) !== -1,
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
      numberRegex: /(\d+)/g,
      fractionsRegex: /([1-9][0-9]*\/[1-9][0-9]*)/g,
    };
  },
};
</script>
