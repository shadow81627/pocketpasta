<template>
  <div class="product" itemscope itemtype="http://schema.org/Product">
    <div class="row">
      <div class="col-12 col-md-6">
        <h1 itemprop="name">{{ name }}</h1>
        <p itemprop="description">{{ description }}</p>
      </div>
      <div class="col-12 col-md-6">
        <b-img
          v-if="image"
          :src="cloudinaryify(image)"
          :srcset="[
            `${cloudinaryify(image, 110)} 110w`,
            `${cloudinaryify(image, 220)} 220w`,
            `${cloudinaryify(image, 540)} 540w`,
            `${cloudinaryify(image, 1080)} 1080w`,
          ]"
          class="img-fluid mx-auto d-block"
          :alt="name"
          throttle="100"
          width="540"
          height="540"
          itemprop="image"
          blank-src
          fluid
          sizes="(max-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
    <!-- <div class="row d-block d-md-none">
      <div class="col-12">
        <h1 itemprop="name">{{ name }}</h1>
        <p itemprop="description">{{ description }}</p>
      </div>
    </div> -->

    <!-- <p v-if="recipeYield">
      <strong>Servings:</strong>
      <span>{{ recipeYield }}</span>
    </p>
    <div v-if="ingredient">
      <h2>Ingredients:</h2>
      <ol class="list-group-flush">
        <li
          v-for="ingredient in ingredient"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
      </ol>
    </div> -->

    <div
      v-if="offers && offers.offers"
      itemprop="offers"
      itemscope
      itemtype="http://schema.org/AggregateOffer"
    >
      <h2>Sellers</h2>
      <div
        v-for="(offer, index) in offers.offers"
        :key="index"
        itemprop="offers"
        itemscope
        itemtype="http://schema.org/Offer"
        class="list-group-flush"
      >
        <span class="list-group-item">
          <a
            v-if="offer.url"
            :href="offer.url"
            target="_blank"
            itemprop="url"
            rel="noopener"
          >
            <span itemprop="offeredBy">{{ offer.offeredBy }}</span></a
          >
          <span v-if="offer.price" itemprop="price">{{
            new Intl.NumberFormat('en-AU', {
              style: 'currency',
              currency: offer.priceCurrency || 'AUD',
            }).format(offer.price)
          }}</span></span
        >
      </div>
    </div>

    <nutrition-fact-table
      v-if="
        additionalProperty &&
        additionalProperty.find((property) => property.name === 'nutrition')
      "
      v-bind="
        additionalProperty.find((property) => property.name === 'nutrition')
      "
      class="my-4"
    />

    <keywords
      v-if="keywords"
      :tags="keywords ? keywords.split(',') : []"
      label="Tags"
    />
  </div>
</template>

<script>
import Keywords from '@/components/Keywords.vue';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';

export default {
  components: {
    Keywords,
    NutritionFactTable,
  },
  inheritAttrs: false,
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    suitableForDiet: { type: String, required: false },
    author: { type: Object, required: false },
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
    offers: { type: Array, default: () => [] },
    additionalProperty: { type: Array, default: () => [] },
  },
  computed: {
    linkData() {
      return {
        ...this.$props,
        '@type': 'Product',
        // dateModified: this.updatedAt.toISOString(),
        // updatedAt: undefined,
      };
    },
  },
  methods: {
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
