<template>
  <span v-if="offerCount">
    <strong itemprop="lowPrice">
      <price :price="lowPrice" :currency="priceCurrency"
    /></strong>
    <span v-show="highPrice !== lowPrice">
      <span>-</span>
      <strong itemprop="highPrice">
        <price :price="highPrice" :currency="priceCurrency" />
      </strong>
    </span>
    <span itemprop="offerCount">({{ offerCount }})</span>
    <span itemprop="priceCurrency">{{ priceCurrency }}</span>
  </span>
</template>

<script>
import Price from '~/components/Price';
export default {
  components: { Price },
  inheritAttrs: false,
  props: {
    lowPrice: { type: Number },
    highPrice: { type: Number },
    priceCurrency: { type: String },
    offerCount: { type: Number, required: true },
  },
};
</script>
