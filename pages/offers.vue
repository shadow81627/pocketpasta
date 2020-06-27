<template>
  <v-container>
    <v-row v-for="(items, index) in list" :key="index">
      <v-col>
        <v-card
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/AggregateOffer"
        >
          <v-card-title>{{ name(items) }}</v-card-title>
          <v-card-text>
            <strong itemprop="lowPrice">{{
              new Intl.NumberFormat('en-AU', {
                style: 'currency',
                currency: offerData(items).priceCurrency || 'AUD',
              }).format(offerData(items).lowPrice)
            }}</strong>
            <span
              v-show="offerData(items).highPrice !== offerData(items).lowPrice"
            >
              <span>-</span>
              <strong itemprop="highPrice">{{
                new Intl.NumberFormat('en-AU', {
                  style: 'currency',
                  currency: offerData(items).priceCurrency || 'AUD',
                }).format(offerData(items).highPrice)
              }}</strong>
            </span>
            <span itemprop="offerCount"
              >({{ offerData(items).offerCount }})</span
            >
            <span itemprop="priceCurrency">{{
              offerData(items).priceCurrency
            }}</span>
          </v-card-text>
          <v-list>
            <v-list-item v-for="(offer, index2) in items" :key="index2">
              <strong v-if="offer.price" itemprop="price">{{
                new Intl.NumberFormat('en-AU', {
                  style: 'currency',
                  currency: offer.priceCurrency || 'AUD',
                }).format(offer.price)
              }}</strong>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import path from 'path';
import { capitalize, groupBy, head, map } from 'lodash-es';
export default {
  async fetch() {
    const list = await this.$content('offers', { deep: true }).fetch();
    const groups = groupBy(list, 'dir');
    this.list = groups;
  },
  // fetchOnServer: false,
  data: () => ({ list: [] }),
  methods: {
    name(items) {
      const dir = head(items).dir;
      return path.basename(dir).split('-').map(capitalize).join(' ');
    },
    offerData(offers) {
      return {
        priceCurrency: head(map(offers, 'priceCurrency')),
        '@type': 'AggregateOffer',
        highPrice: Math.max(...map(offers, 'price')),
        lowPrice: Math.min(...map(offers, 'price')),
        offerCount: offers.length,
      };
    },
  },
};
</script>
