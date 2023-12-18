<template>
  <div
    style="
      padding-top: 56.25%;
      position: relative;
      overflow: hidden;
      width: 100%;
      background-size: cover;
    "
    :style="{
      backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
    }"
  >
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
      "
    ></iframe>
  </div>
</template>

<script>
export default {
  props: { videoId: { type: String, required: true } },
};
</script>
