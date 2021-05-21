<template>
  <div class="container">
    <div class="product" itemscope itemtype="http://schema.org/Product">
      <v-row>
        <v-col cols="12" md="6">
          <h1 itemprop="name">{{ name }}</h1>
          <p itemprop="description">{{ description }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <Hero
            v-if="image"
            :src="image"
            :alt="name"
            width="540"
            height="540"
            itemprop="image"
            sizes="(max-width: 768px) 50vw, 100vw"
            contain
            :gradient="null"
            :aspect-ratio="null"
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
            <PriceSummary v-bind="offerData"
          /></v-expansion-panel-header>
          <v-expansion-panel-content eager>
            <Offers v-bind="offerData" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <NutritionFactTable
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
              <Keywords
                :tags="(keywords || []).split(',')"
                :label="null"
                class="list-group-item"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <Disqus shortname="pocketpasta" style="margin-top: 16px" />
    </div>
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus';
import { map, head, range } from 'lodash-es';
export default {
  components: {
    Disqus,
  },
  async asyncData(context) {
    try {
      const id = context.route.params.id;
      const item = await context.$content('products', id).fetch();
      return { id, ...item };
    } catch {
      context.error({ statusCode: 404 });
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.93,
        ratingCount: 1,
      },
      offers: {},
      additionalProperty: [],
    };
  },
  head() {
    return {
      title: this.name,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.name,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description,
        },
      ],
      script: [
        {
          json: this.linkData(),
          type: 'application/ld+json',
        },
      ],
    };
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
  },
  methods: {
    range,
    async linkData() {
      const type = ['Product'];
      if (this.nutritionData) {
        type.push('MenuItem');
      }
      return {
        ...(await this.$content('products', this.id).fetch()),
        offers: { ...this.offerData, '@type': 'AggregateOffer' },
        nutrition: this.nutritionData || undefined,
        additionalProperty: undefined,
        '@type': type,
        '@context': 'http://schema.org',
      };
    },
  },
};
</script>
