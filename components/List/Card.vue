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
    <v-avatar
      v-show="layout === 'columns'"
      color="grey"
      height="256"
      width="auto"
      tile
    >
      <v-img
        :lazy-src="$img(imageUrl, {}, { preset: 'placeholder' })"
        :src="
          _srcset(imageUrl, {
            sizes: 'xs:100vw sm:50vw md:33vw lg:25vw',
          }).src
        "
        :srcset="
          _srcset(imageUrl, {
            sizes: 'xs:100vw sm:50vw md:33vw lg:25vw',
          }).srcset
        "
        itemprop="image"
        height="256"
        max-height="256"
        :alt="name"
      />
    </v-avatar>
    <v-container>
      <v-row class="align-center justify-center" no-gutters>
        <v-col v-show="layout !== 'columns'" cols="auto">
          <v-avatar class="ma-sm-3" size="128" tile color="grey">
            <v-img
              :lazy-src="$img(imageUrl, {}, { preset: 'placeholder' })"
              :src="source({ image: imageUrl }).src"
              :srcset="source({ image: imageUrl }).srcset"
              height="128"
              width="128"
              itemprop="image"
              :alt="name"
            />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="" style="min-width: 224px">
          <v-card-title title-tag="h2" class="h4 text-break text-wrap">
            {{ name }}
          </v-card-title>
          <v-card-subtitle class="text-wrap text-subtitle-1">{{
            truncate(description)
          }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ImageSources from '@/mixins/srcset';
export default {
  mixins: [ImageSources],
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
    imageUrl() {
      const image = Array.isArray(this.image) ? this.image[0] : this.image;
      if (image) {
        if (
          typeof image === 'object' &&
          image !== null &&
          !Array.isArray(image)
        ) {
          const { url } = image;
          return url;
        } else {
          return image;
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
    cloudinaryify({ image, width = 128, height = 128 }) {
      if (image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return `https://res.cloudinary.com/pocketpasta/image/fetch/w_${width},h_${height},c_fill,f_auto,q_auto/${image}`;
        } else {
          return image;
        }
      } else {
        return '';
      }
    },
    source({ image, width = 128, height = 128 }) {
      const vm = this;
      const dprs = [1, 1.5, 2, 2.5, 3];
      return {
        src: vm.cloudinaryify({ image, width, height }),
        srcset: dprs
          .map((dpr) => {
            const imageUrl = vm.cloudinaryify({
              image,
              width: Number(width) ? Number(width) * dpr : width,
              height: Number(height) ? Number(height) * dpr : height,
            });
            return imageUrl ? `${imageUrl} ${dpr}x` : '';
          })
          .filter(Boolean)
          .join(', '),
      };
    },
  },
};
</script>
