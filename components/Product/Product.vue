<template>
  <div class="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>

    <img
      v-if="product.image"
      :src="product.image"
      class="img-fluid mx-auto d-block"
      :alt="product.name"
    />

    <share class="py-4" />

    <p>
      <strong>Servings:</strong>
      <span>{{ product.recipeYield }}</span>
    </p>
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
