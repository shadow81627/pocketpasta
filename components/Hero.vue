<template>
  <v-container class="pa-0 hidden-print-only" fluid v-on="$listeners">
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <v-card :color="color" flat tile>
          <v-img
            :lazy-src="$img(src, {}, { preset: 'placeholder' })"
            :src="_srcset(src, { preset: 'hero' }).src"
            :srcset="_srcset(src, { preset: 'hero' }).srcset"
            :alt="alt"
            max-height="80vh"
            :sizes="_srcset(src, { preset: 'hero' }).size"
            :gradient="gradient"
            :contain="contain"
            color="grey"
            :aspect-ratio="16 / 9"
          >
            <slot>
              <v-container
                class="fill-height align-items-end justify-start"
                fluid
              >
                <v-row align="center" justify="center">
                  <v-col class="text-center" cols="12">
                    <h1 v-if="heading" class="mb-4 text-shadow">
                      {{ heading }}
                    </h1>
                    <h2 v-if="subheading" class="subheading text-shadow">
                      {{ subheading }}
                    </h2>
                  </v-col>
                </v-row>
              </v-container>
            </slot>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageSources from '@/mixins/srcset';
export default {
  mixins: [ImageSources],
  props: {
    heading: { type: String, default: null },
    subheading: { type: String, default: null },
    alt: { type: String, default: '' },
    contain: { type: Boolean, default: undefined },
    gradient: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)',
    },
    width: { type: [Number, String], default: 1280 },
    height: { type: [Number, String], default: 500 },
    color: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: '/v1559982334/hero_rko6us.jpg',
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.BASE_URL}${this.$img(
            this.src,
            {},
            { preset: 'og' },
          )}`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: 1280,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: 630,
        },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: `${this.$config.BASE_URL}${this.$img(
            this.src,
            {},
            { preset: 'hero' },
          )}`,
          imagesrcset: this._srcset.srcset,
          imagesizes: this._srcset.size,
        },
      ],
    };
  },
};
</script>
