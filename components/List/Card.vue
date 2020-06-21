<template>
  <nuxt-link
    :to="{ path }"
    tag="b-card"
    no-body
    class="overflow-hidden rounded-0"
    style="cursor: pointer;"
  >
    <div class="row no-gutters">
      <div style="min-width: 128px;" :class="{ col: layout === 'columns' }">
        <b-card-img-lazy
          v-if="imageData"
          fluid
          center
          blank-src
          :src="imageData.src"
          :srcset="imageData.srcset"
          rounded="0"
          height="128"
          width="128"
          itemprop="image"
          :alt="name"
          class="mx-auto d-block"
        />
      </div>
      <br />
      <div class="col overflow-hidden" style="min-width: 220px;">
        <b-card-body>
          <header>
            <b-card-title title-tag="h2" class="h4">
              <nuxt-link :to="{ path }">{{ name }}</nuxt-link>
            </b-card-title>
          </header>
          <b-card-text>{{ truncate(description) }} </b-card-text>
        </b-card-body>
      </div>
    </div>
  </nuxt-link>
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
            ],
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
