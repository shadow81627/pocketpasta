<template>
  <v-card :to="{ path }" exact nuxt ripple hover class="text-decoration-none">
    <div class="d-flex flex-no-wrap align-center">
      <v-avatar class="ma-3" size="128" tile>
        <v-img
          v-if="imageData"
          :src="imageData.src"
          :srcset="imageData.srcset"
          height="128"
          width="128"
          itemprop="image"
          :alt="name"
        />
      </v-avatar>
      <div class="align-center">
        <v-card-title title-tag="h2" class="h4">
          {{ name }}
        </v-card-title>
        <v-card-subtitle class="text-wrap subtitle-1">{{
          truncate(description)
        }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: { type: String, required: true },
    slug: { type: [String, Number], required: true },
    name: { type: String, default: null },
    description: { type: String, default: null },
    image: { type: [String, Object, Array], default: null },
    layout: { type: String, default: null },
  },
  computed: {
    path() {
      return `/${this.type.toLowerCase()}s/${this.slug}`;
    },
    imageData() {
      function cloudinaryify(image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return {
            src: `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_128,h_128,c_fill,f_auto,q_auto/${image}`,
            srcset: [
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_128,h_128,c_fill,f_auto,q_auto/${image} 1x`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_192,h_192,c_fill,f_auto,q_auto/${image} 1.5x`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_256,h_256,c_fill,f_auto,q_auto/${image} 2x`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_320,h_320,c_fill,f_auto,q_auto/${image} 2.5x`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_384,h_384,c_fill,f_auto,q_auto/${image} 3x`,
            ].join(','),
          };
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
          const { url } = this.image;
          return cloudinaryify(url);
        } else if (Array.isArray(this.image)) {
          return cloudinaryify(this.image[0]);
        } else {
          return cloudinaryify(this.image);
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
