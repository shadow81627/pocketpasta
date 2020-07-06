<template>
  <v-card id="message">
    <h2>404</h2>
    <h1>{{ $t('error.404.heading') }}</h1>
    <p>
      {{ $t('error.404.description') }}
    </p>
    <v-btn :to="localePath('index')" color="primary" block large>{{
      $t('layout.navigation.home')
    }}</v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: this.$t('error.404.heading'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.404.description'),
        },
      ],
    };
  },
};
</script>

<style media="screen" scoped>
#message {
  max-width: 360px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
}
#message h3 {
  font-weight: normal;
  font-size: 16px;
  margin: 16px 0 12px;
}
#message h2 {
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 8px;
}
#message h1 {
  font-size: 22px;
  font-weight: 300;
  margin: 0 0 16px;
}
#message p {
  line-height: 140%;
  margin: 16px 0 24px;
  font-size: 14px;
}
#load {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 13px;
}
</style>
