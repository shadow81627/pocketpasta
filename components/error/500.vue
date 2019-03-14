<template>
  <div class="container">
    <h1>OOPSIE WOOPSIE!!</h1>
    <p>
      Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our
      headquarters are working VEWY HAWD to fix this!
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
