<template>
  <div class="product" itemscope itemtype="http://schema.org/Product">
    <h1 itemprop="name">{{ product.name }}</h1>
    <p>{{ product.description }}</p>

    <b-img-lazy
      v-if="product.image"
      :src="product.image"
      class="img-fluid mx-auto d-block"
      :alt="product.name"
      itemprop="image"
    />

    <share class="py-4" />

    <p v-if="product.recipeYield">
      <strong>Servings:</strong>
      <span>{{ product.recipeYield }}</span>
    </p>
    <div v-if="product.ingredient">
      <h2>Ingredients:</h2>
      <ol class="list-group-flush">
        <li
          v-for="ingredient in product.ingredient"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
      </ol>
    </div>

    <div
      v-if="product.offers.offers"
      itemprop="offers"
      itemscope
      itemtype="http://schema.org/AggregateOffer"
    >
      <h2>Sellers</h2>
      <div
        v-for="(offer, index) in product.offers.offers"
        :key="index"
        itemprop="offers"
        itemscope
        itemtype="http://schema.org/Offer"
        class="list-group-flush"
      >
        <span class="list-group-item">
          <a :href="offer.url" target="_blank" itemprop="url">
            <span itemprop="offeredBy">{{ offer.offeredBy }}</span></a
          >
          <span itemprop="price">{{
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
        product.additionalProperty &&
          product.additionalProperty.find(
            (property) => property.name === 'nutrition',
          )
      "
      v-bind="
        product.additionalProperty.find(
          (property) => property.name === 'nutrition',
        )
      "
      class="my-4"
    />

    <keywords
      :tags="product.keywords ? product.keywords.split(',') : []"
      label="Tags"
    />
  </div>
</template>

<script>
import Keywords from '@/components/Keywords.vue';
import Share from '@/components/Social/Share';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';

export default {
  components: {
    Keywords,
    Share,
    NutritionFactTable,
  },
  inheritAttrs: false,
  computed: {
    product() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      return this.$store.getters.getProductById(id);
    },
  },
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(this.product),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
};
</script>
