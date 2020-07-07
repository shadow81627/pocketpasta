<template>
  <v-card
    :to="{ path }"
    exact
    nuxt
    ripple
    hover
    elevation="4"
    class="flex d-flex flex-column"
  >
    <v-container>
      <v-row class="align-center justify-center" no-gutters>
        <v-col cols="auto">
          <v-avatar class="ma-sm-3" size="128" tile>
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
        </v-col>
        <v-col cols="12" sm="" style="min-width: 224px;">
          <v-card-title title-tag="h2" class="h4 text-break text-wrap">
            {{ name }}
          </v-card-title>
          <v-card-subtitle class="text-wrap subtitle-1">{{
            truncate(description)
          }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: { type: String, required: true },
    slug: { type: [String, Number], required: true },
    name: { type: String, default: null },
    description: { type: String, default: undefined },
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
      const image = Array.isArray(this.image) ? this.image[0] : this.image;
      if (image) {
        if (
          typeof image === 'object' &&
          image !== null &&
          !Array.isArray(image)
        ) {
          const { url } = image;
          return cloudinaryify(url);
        } else {
          return cloudinaryify(image);
        }
      } else {
        return null;
      }
    },
  },
  methods: {
    truncate(text = '', stop = 150, clamp = '...') {
      return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
    },
  },
};
</script>
