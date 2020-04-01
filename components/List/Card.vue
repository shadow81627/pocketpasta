<template>
  <nuxt-link
    :to="{ path: `${id}` }"
    tag="b-card"
    no-body
    class="overflow-hidden rounded-0"
    append
  >
    <div class="row no-gutters">
      <div
        v-if="image"
        :class="{ 'col-md-4': layout === null || layout === 'list' }"
      >
        <b-card-img-lazy
          v-if="
            typeof image === 'object' && image !== null && !Array.isArray(image)
          "
          fluid
          center
          fluid-grow
          blank
          :src="image.url"
          rounded="0"
          :height="image.height"
          :width="image.width"
          itemprop="image"
        />
        <b-card-img-lazy
          v-else
          fluid
          center
          fluid-grow
          blank
          :src="Array.isArray(image) ? image[0] : image"
          rounded="0"
          itemprop="image"
        />
      </div>
      <div class="col">
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
  methods: {
    truncate(text, stop = 150, clamp = '...') {
      if (text) {
        return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
      }
    },
  },
};
</script>
