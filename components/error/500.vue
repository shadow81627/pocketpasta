<template>
  <div class="container">
    <h1>OOPSIE WOOPSIE!!</h1>
    <p>
      Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our
      headquarters are working VEWY HAWD to fix this!
    </p>
    <video
      autoplay
      width="640"
      hieght="390"
      data-alt="Baboon pounding on laptop keyboard"
      src="https://media.gettyimages.com/videos/medium-shot-baboon-pounding-on-laptop-keyboard-video-id712-54"
      muted
      loop
    />
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
