<template>
  <v-container>
    <v-row v-for="items in list" :key="name(items)">
      <v-col>
        <v-card
          itemprop="offers"
          itemscope
          itemtype="http://schema.org/AggregateOffer"
        >
          <v-card-title>{{ name(items) }}</v-card-title>
          <v-card-subtitle
            ><PriceSummary v-bind="offerData(items)"
          /></v-card-subtitle>
          <v-card-text>
            <Offers :offers="items" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import path from 'path';
import { capitalize, groupBy, head, map } from 'lodash-es';
import Offers from '~/components/Offers';
import PriceSummary from '~/components/PriceSummary';
export default {
  components: {
    Offers,
    PriceSummary,
  },
  // fetchOnServer: false,
  data: () => ({ list: [] }),
  async fetch() {
    const list = await this.$content('offers', { deep: true }).fetch();
    const groups = groupBy(list, 'dir');
    this.list = groups;
  },
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
