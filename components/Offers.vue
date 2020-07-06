<template>
  <v-list>
    <v-list-item v-for="offer in offers" :key="offer.offeredBy">
      <strong v-if="offer.price" itemprop="price">
        <price :currency="offer.priceCurrency" :price="offer.price" />
      </strong>
      <span>&nbsp;</span>
      <a
        v-if="offer.url"
        :href="offer.url"
        target="_blank"
        itemprop="url"
        rel="noopener"
      >
        <span itemprop="offeredBy">{{ offer.offeredBy }}</span></a
      >
    </v-list-item>
  </v-list>
</template>

<script>
import Price from '~/components/Price';
export default {
  components: { Price },
  inheritAttrs: false,
  props: {
    offers: {
      type: Array,
      required: true,
    },
  },
};
</script>
