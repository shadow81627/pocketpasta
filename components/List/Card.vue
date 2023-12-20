<template>
  <v-card
    :to="{ path }"
    exact
    nuxt
    ripple
    hover
    class="flex d-flex flex-column justify-between flex-grow-1"
  >
    <div
      v-show="layout === 'columns'"
      color="grey"
      size="256"
      width="auto"
      rounded="0"
      tile
    >
      <LazyNuxtPicture
        :src="imageUrl"
        :width="640"
        :height="360"
        class="flex-grow-0 max-w-full h-auto"
        crossorigin="anonymous"
        itemprop="image"
        fit="inside"
        loading="lazy"
        :alt="name"
        sizes="xs:100vw sm:50vw md:33vw lg:33vw xl:33vw"
        :img-attrs="{
          style: {
            'object-fit': 'cover',
            'max-width': '100%',
            height: 'auto',
          },
        }"
      ></LazyNuxtPicture>
      <!-- <v-img
        :lazy-src="img(imageUrl, {}, { preset: 'placeholder' })"
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
      /> -->
    </div>
    <v-container class="pa-0">
      <v-row class="align-center justify-center" no-gutters>
        <v-col v-if="layout !== 'columns'" cols="auto">
          <div class="ma-sm-3" size="128" tile color="grey">
            <v-img
              :lazy-src="img(imageUrl, {}, { preset: 'placeholder' })"
              :src="source({ image: imageUrl }).src"
              :srcset="source({ image: imageUrl }).srcset"
              height="128"
              width="128"
              itemprop="image"
              :alt="name"
            />
          </div>
        </v-col>
        <v-col cols="12" sm="" style="min-width: 224px">
          <v-card-title tag="h2" class="text-break text-wrap">
            {{ name }}
          </v-card-title>
          <v-card-text class="text--primary text-body-1 pt-0">{{
            truncate(description)
          }}</v-card-text>
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
  setup() {
    const img = useImage();
    return { img };
  },
  computed: {
    path() {
      return `/${this.type?.toLowerCase()}s/${this.slug}`;
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
        return '/icon.png';
      }
    },
  },
  methods: {
    _srcset(src = '/v1559982334/hero_rko6us.jpg', options) {
      const defaults = {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        ...options,
      };
      const img = useImage();
      return img.getSizes(src, defaults);
    },
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
      // eslint-disable-next-line @typescript-eslint/no-this-alias
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
