<template>
  <v-col
    cols="12"
    :sm="view === 'columns' ? 6 : 12"
    :md="view === 'columns' ? 4 : 12"
    :lg="view === 'columns' ? 3 : 12"
    class="d-flex flex-column"
  >
    <slot />
  </v-col>
</template>

<script>
export default {};
</script>

<style></style>
