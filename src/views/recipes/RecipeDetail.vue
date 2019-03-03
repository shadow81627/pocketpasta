<template>
  <div class="recipe">
    <h1>Recipe {{ $route.params.id }} Details</h1>
  </div>
</template>

<script>
export default {
  data: () => ({
    recipes: [],
  }),
};
</script>
