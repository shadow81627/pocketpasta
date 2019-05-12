<template>
  <nuxt-link
    :to="localePath({ path: id })"
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
          fluid
          center
          fluid-grow
          blank
          :src="image"
          rounded="0"
        />
      </div>
      <div class="col">
        <b-card-body>
          <header>
            <b-card-title>{{ name }}</b-card-title>
          </header>
          <b-card-text>
            {{ description | truncate }}
          </b-card-text>
        </b-card-body>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  filters: {
    truncate: function(text, stop = 150, clamp = '...') {
      if (text) {
        return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
      }
    },
  },
  inheritAttrs: false,
  props: {
    id: { type: [String, Number], required: true },
    name: {
      type: String,
      default: function() {
        return `Recipe: ${this.id}`;
      },
    },
    description: { type: String, default: null },
    image: { type: String, default: null },
    layout: { type: String, default: null },
  },
};
</script>
