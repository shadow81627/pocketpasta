<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
    <img :src="recipe.image" class="img-fluid" />
    <!-- <p>Author: {{ recipe.author }}</p> -->
    <!-- <p>Published: {{ recipe.datePublished }}</p> -->
    <p>
      <strong>Makes:</strong>
      <span>{{ recipe.recipeYield }}</span>
    </p>
    <h2>Ingredients:</h2>
    <ol class="list-group-flush">
      <li
        v-for="ingredient in recipe.recipeIngredient"
        :key="ingredient"
        style="/*display: list-item;*//*list-style-position: inside;*/"
        class="list-group-item"
      >
        {{ ingredient }}
      </li>
    </ol>

    <h2>Instructions:</h2>
    <ol class="list-group-flush">
      <li
        v-for="instruction in recipe.recipeInstructions"
        :key="instruction"
        style="/*display: list-item;*//*list-style-position: inside;*/"
        class="list-group-item"
      >
        {{ instruction.text }}
      </li>
    </ol>
    <!-- <p>Tags: {{ recipe.keywords }}</p> -->
    <Keywords :tags="recipe.keywords.split(',')" label="Tags" />
  </div>
</template>

<script>
import Keywords from '@/components/Keywords.vue';

export default {
  inheritAttrs: false,
  components: {
    Keywords,
  },
  computed: {
    recipe() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      return this.$store.getters.getRecipeById(id);
    },
  },
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(this.recipe),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    };
  },
};
</script>
