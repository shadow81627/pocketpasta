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
  <number-text
    v-else-if="Array.isArray(text.split(numberRegex))"
    :text="text"
  />
  <span v-else>{{ text }}</span>
</template>

<script>
import NumberText from '@/components/text/NumberText';
export default {
  components: {
    NumberText,
  },
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

<style scoped>
.frac {
  font-size: 1.3rem;
}
</style>
