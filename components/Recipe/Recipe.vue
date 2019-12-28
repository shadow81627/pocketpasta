<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>

    <div
      v-if="recipe.video"
      class="embed-responsive embed-responsive-16by9 d-print-none"
    >
      <iframe
        v-if="Array.isArray(recipe.video)"
        class="embed-responsive-item"
        :src="recipe.video[0].contentUrl"
        allowfullscreen
        :poster="recipe.video[0].thumbnailUrl"
      />
    </div>
    <div v-else-if="recipe.image">
      <b-img-lazy
        v-if="typeof recipe.image === 'object' && recipe.image !== null"
        :src="recipe.image.url"
        class="img-fluid mx-auto d-block"
        :alt="recipe.name"
        throttle="100"
        itemprop="image"
        :height="recipe.image.height"
        :width="recipe.image.width"
      />
      <b-img-lazy
        v-else
        :src="recipe.image"
        class="img-fluid mx-auto d-block"
        :alt="recipe.name"
        throttle="100"
        itemprop="image"
      />
    </div>
    <!-- <p>Author: {{ recipe.author }}</p> -->
    <!-- <p>Published: {{ recipe.datePublished }}</p> -->

    <share class="py-4" />

    <p>
      <strong>Makes:</strong>
      <span>{{ recipe.recipeYield }}</span>
    </p>
    <section v-if="recipe.recipeIngredient">
      <h2>Ingredients:</h2>
      <ol class="list-group-flush  pl-0">
        <li
          v-for="ingredient in recipe.recipeIngredient"
          :key="ingredient"
          class="list-group-item"
        >
          <span v-html="splitFraction(ingredient)" />
        </li>
      </ol>
    </section>

    <section v-if="recipe.recipeInstructions">
      <h2>Instructions:</h2>
      <ol
        v-if="Array.isArray(recipe.recipeInstructions)"
        class="list-group-flush pl-0"
      >
        <li
          v-for="instruction in recipe.recipeInstructions"
          :key="instruction.text"
          class="list-group-item"
        >
          {{ instruction.text }}
        </li>
      </ol>
      <p v-else>{{ recipe.recipeInstructions }}</p>
    </section>

    <nutrition-fact-table
      v-if="recipe.nutrition"
      v-bind="recipe.nutrition"
      class="my-4"
    />

    <section class="mb-2">
      <h2 class="h4">Tags</h2>
      <div class="list-group-flush">
        <keywords
          :tags="recipe.keywords ? recipe.keywords.split(',') : []"
          :label="null"
          class="list-group-item"
        />
      </div>
    </section>

    <section v-if="recipe.sameAs">
      <h2 class="h4">References</h2>
      <div class="list-group-flush">
        <span
          v-for="reference in recipe.sameAs"
          :key="reference"
          class="list-group-item"
        >
          <a :href="reference" target="_blank" itemprop="url" rel="noopener">{{
            reference
          }}</a>
        </span>
      </div>
    </section>
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
    recipe() {
      // parse id param to int for id lookup
      const id = parseInt(this.$route.params.id, 10);
      const recipe = JSON.parse(
        JSON.stringify(this.$store.getters.getRecipeById(id)),
      );
      recipe.recipeIngredient = [...new Set(recipe.recipeIngredient)];

      return recipe;
    },
  },
  methods: {
    splitFraction(value, sep = '/') {
      if (!value) return '';
      value = value.toString();
      const split = value.split(sep);
      if (Array.isArray(split) && split.length >= 2) {
        const combined = split.reduce((accumulator, currentValue) => {
          const last = accumulator.slice(-1);

          if (parseInt(last) && parseInt(currentValue)) {
            return (
              accumulator.substring(0, accumulator.length - 1) +
              '<span class="frac">' +
              last +
              '/' +
              currentValue.charAt(0) +
              '</span>' +
              currentValue.substr(1)
            );
          } else {
            return accumulator + currentValue;
          }
        });

        return combined;
      }
      return value;
    },
  },
  head() {
    return {
      title: this.recipe.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.recipe.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.recipe.description,
        },
      ],
      script: [
        {
          json: this.recipe,
          type: 'application/ld+json',
        },
      ],
    };
  },
};
</script>
