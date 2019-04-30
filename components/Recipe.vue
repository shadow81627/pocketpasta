<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>

    <div
      v-if="recipe.video"
      class="embed-responsive embed-responsive-16by9 d-print-none"
    >
      <iframe
        class="embed-responsive-item"
        :src="recipe.video[0].contentUrl"
        allowfullscreen
        :poster="recipe.video[0].thumbnailUrl"
      />
    </div>
    <img v-else :src="recipe.image" class="img-fluid" :alt="recipe.name" />
    <!-- <p>Author: {{ recipe.author }}</p> -->
    <!-- <p>Published: {{ recipe.datePublished }}</p> -->

    <Share class="py-4" />

    <p>
      <strong>Makes:</strong>
      <span>{{ recipe.recipeYield }}</span>
    </p>
    <h2>Ingredients:</h2>
    <ol class="list-group-flush">
      <li
        v-for="ingredient in recipe.recipeIngredient"
        :key="ingredient"
        class="list-group-item"
      >
        {{ ingredient }}
      </li>
    </ol>

    <h2>Instructions:</h2>
    <ol class="list-group-flush">
      <li
        v-for="instruction in recipe.recipeInstructions"
        :key="instruction.text"
        style="/*display: list-item;*//*list-style-position: inside;*/"
        class="list-group-item"
      >
        {{ instruction.text }}
      </li>
    </ol>
    <!-- <p>Tags: {{ recipe.keywords }}</p> -->
    <Keywords
      :tags="recipe.keywords ? recipe.keywords.split(',') : []"
      label="Tags"
    />
  </div>
</template>

<script>
import Keywords from '@/components/Keywords.vue';
import Share from '@/components/Social/Share';

export default {
  components: {
    Keywords,
    Share,
  },
  inheritAttrs: false,
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
