<template>
  <nuxt-link
    :to="{ path: `${id}` }"
    tag="b-card"
    no-body
    class="overflow-hidden rounded-0"
    append
  >
    <div class="row no-gutters">
      <div style="min-width: 128px;">
        <b-card-img-lazy
          v-if="imageData"
          xfluid
          center
          blank
          :src="imageData.url"
          rounded="0"
          height="128"
          width="128"
          itemprop="image"
          alt=""
          class="mx-auto d-block"
          style="width: auto;"
        />
      </div>
      <br />
      <div class="col overflow-hidden" style="min-width: 220px;">
        <b-card-body>
          <header>
            <b-card-title>{{ name }}</b-card-title>
          </header>
          <b-card-text>{{ truncate(description) }}</b-card-text>
        </b-card-body>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: { type: [String, Number], required: true },
    name: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: [String, Object, Array], default: null },
    layout: { type: String, default: null },
  },
  computed: {
    imageData() {
      function cloudinaryify(image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_128,h_128,c_fill,f_auto,q_auto/${image}`;
        } else {
          return image;
        }
      }
      if (this.image) {
        if (
          typeof this.image === 'object' &&
          this.image !== null &&
          !Array.isArray(this.image)
        ) {
          const { url, width, height } = this.image;
          return { url: cloudinaryify(url), width, height };
        } else if (Array.isArray(this.image)) {
          return { url: cloudinaryify(this.image[0]) };
        } else {
          return { url: cloudinaryify(this.image) };
        }
      } else {
        return null;
      }
    },
  },
  methods: {
    truncate(text, stop = 150, clamp = '...') {
      if (text) {
        return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
      }
    },
  },
};
</script>
