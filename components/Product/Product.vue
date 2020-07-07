<template>
  <div class="product" itemscope itemtype="http://schema.org/Product">
    <v-row>
      <v-col cols="12" md="6">
        <h1 itemprop="name">{{ name }}</h1>
        <p itemprop="description">{{ description }}</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-img
          v-if="image"
          :src="cloudinaryify(image)"
          :srcset="
            [
              `${cloudinaryify(image, 110)} 110w`,
              `${cloudinaryify(image, 220)} 220w`,
              `${cloudinaryify(image, 540)} 540w`,
              `${cloudinaryify(image, 1080)} 1080w`,
            ].join(',')
          "
          :alt="name"
          width="540"
          height="540"
          itemprop="image"
          sizes="(max-width: 768px) 50vw, 100vw"
          contain
        />
      </v-col>
    </v-row>

    <v-expansion-panels multiple :value="range(2)">
      <v-expansion-panel
        v-if="offerData && offerData.offers"
        itemprop="offers"
        itemscope
        itemtype="http://schema.org/AggregateOffer"
      >
        <v-expansion-panel-header>
          <h2>Sellers</h2>
          <price-summary v-bind="offerData"
        /></v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <offers v-bind="offerData" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <nutrition-fact-table
        v-if="nutritionData"
        v-bind="nutritionData"
        class="my-4"
      />
      <v-expansion-panel v-if="keywords" class="mb-2 d-print-none">
        <v-expansion-panel-header>
          <h2 class="h4">Tags</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="list-group-flush">
            <keywords
              :tags="(keywords || []).split(',')"
              :label="null"
              class="list-group-item"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <disqus shortname="pocketpasta" style="margin-top: 16px;" />
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus';
import { map, head, range } from 'lodash-es';
import Keywords from '@/components/Keywords.vue';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';
import Offers from '~/components/Offers';
import PriceSummary from '~/components/PriceSummary';

export default {
  components: {
    Keywords,
    NutritionFactTable,
    Offers,
    PriceSummary,
    Disqus,
  },
  inheritAttrs: false,
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    gtin13: { type: String, required: false },
    sku: { type: String, required: false },
    nutrition: { type: Object, required: false },
    datePublished: { type: String, required: false },
    keywords: { type: String, required: false },
    image: { type: [Array, String], required: false },
    sameAs: { type: Array, required: false },
    aggregateRating: {
      type: Object,
      default: () => ({
        '@type': 'AggregateRating',
        ratingValue: 4.93,
        ratingCount: 1,
      }),
    },
    offers: { type: Object, default: () => ({}) },
    additionalProperty: { type: Array, default: () => [] },
  },
  computed: {
    nutritionData() {
      return (
        this.nutrition ||
        (this.additionalProperty || []).find(
          (property) => property.name === 'nutrition',
        )
      );
    },
    offerData() {
      if (
        this.offers &&
        this.offers.offers &&
        Array.isArray(this.offers.offers)
      ) {
        const offers = {
          priceCurrency: head(map(this.offers.offers, 'priceCurrency')),
          ...this.offers,
          highPrice: Math.max(...map(this.offers.offers, 'price')),
          lowPrice: Math.min(...map(this.offers.offers, 'price')),
          offerCount: this.offers.offers.length,
        };
        return offers;
      } else {
        return null;
      }
    },
    linkData() {
      const type = ['Product'];
      if (this.nutritionData) {
        type.push('MenuItem');
      }
      return {
        ...this.$props,
        offers: { ...this.offerData, '@type': 'AggregateOffer' },
        nutrition: this.nutritionData || undefined,
        additionalProperty: undefined,
        '@type': type,
        '@context': 'http://schema.org',
      };
    },
  },
  methods: {
    range,
    cloudinaryify(image, width = 540) {
      if (!image.startsWith('https://res.cloudinary.com')) {
        return `https://res.cloudinary.com/pocketpasta/image/fetch/w_${width},h_${width},ar_1:1,c_fill,f_auto,q_auto/${image}`;
      } else {
        return image;
      }
    },
  },
  head() {
    return {
      meta: [
        {
          skip: !this.image,
          hid: 'og:image',
          property: 'og:image',
          content: this.cloudinaryify(this.image),
        },
        {
          skip: !this.image,
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '540',
        },
        {
          skip: !this.image,
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '540',
        },
      ],
      script: [
        {
          json: this.linkData,
          type: 'application/ld+json',
        },
      ],
    };
  },
};
</script>
