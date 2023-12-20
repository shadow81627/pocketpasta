<template>
  <v-card dark class="mb-1">
    <v-text-field
      :xvalue="search"
      clearable
      flat
      solo-inverted
      single-line
      hide-details
      label="Search"
      autocomplete="false"
      @keydown.enter="$event.target.blur()"
      @input="$emit('update:search', $event.target.value)"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  props: {
    search: { type: String, default: '' },
  },
  emits: ['update:search'],
};
</script>
