<template>
  <div class="row align-items-center" :class="{ 'flex-row-reverse': reverse }">
    <div class="col-md-6">
      <slot name="column-1" />
    </div>
    <div class="col-md-6">
      <slot name="column-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reverse: { type: Boolean, default: false },
  },
};
</script>
