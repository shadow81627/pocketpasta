<template>
  <span>
    <span>{{ formattedString }}</span>
    <span v-show="text && text.length > stop">
      <a
        v-show="!isReadMore"
        :href="link"
        @click="triggerReadMore($event, true)"
        >{{ moreStr }}</a
      >
      <a
        v-show="isReadMore"
        :href="link"
        @click="triggerReadMore($event, false)"
        >{{ lessStr }}</a
      >
    </span>
  </span>
</template>

<script>
/**
 * copied from https://www.npmjs.com/package/vue-read-more
 */
export default {
  props: {
    moreStr: {
      type: String,
      default: 'Read more',
    },
    lessStr: {
      type: String,
      default: 'Read less',
    },
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '#',
    },
    stop: {
      type: Number,
      default: 120,
    },
    clamp: {
      type: String,
      default: '...',
    },
  },
  data() {
    return {
      isReadMore: false,
    };
  },
  computed: {
    formattedString() {
      return this.isReadMore ? this.text : this.truncate(this.text);
    },
  },
  methods: {
    triggerReadMore(event, value) {
      if (this.link === '#') {
        event.preventDefault();
      }
      if (this.lessStr !== null || this.lessStr !== '') {
        this.isReadMore = value;
      }
    },
    truncate(text, stop = this.stop, clamp = this.clamp) {
      if (text) {
        return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
      }
    },
  },
};
</script>
