<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>

    <vue-plyr v-if="recipe.video && Array.isArray(recipe.video)">
      <div
        v-if="recipe.video[0].contentUrl.includes('youtube')"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="
          recipe.video[0].contentUrl.split('/').slice(-1).pop()
        "
      />
    </vue-plyr>
    <div v-else-if="imageData.url">
      <b-img-lazy
        :src="imageData.url"
        class="img-fluid mx-auto d-block"
        :alt="recipe.name"
        throttle="100"
        itemprop="image"
        :width="640"
        :height="360"
      />
    </div>
    <!-- <p>Author: {{ recipe.author }}</p> -->
    <!-- <p>Published: {{ recipe.datePublished }}</p> -->

    <share class="py-4" />

    <p>
      <!-- <span>Makes:</span> -->
      <number-text :text="recipe.recipeYield" />
    </p>
    <section v-if="recipe.recipeIngredient">
      <h2>Ingredients:</h2>
      <ol class="list-group-flush pl-0">
        <li
          v-for="ingredient in recipe.recipeIngredient"
          :key="ingredient"
          class="list-group-item"
        >
          <fraction-text :text="ingredient" />
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
          <fraction-text :text="instruction.text" />
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
import NumberText from '@/components/text/NumberText';
import FractionText from '@/components/FractionText';
import Keywords from '@/components/Keywords';
import Share from '@/components/Social/Share';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';

export default {
  components: {
    NumberText,
    FractionText,
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
    imageData() {
      function cloudinaryify(image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return `https://res.cloudinary.com/pocketpasta/image/fetch/w_640,h_360,ar_16:9,c_fill,f_auto,q_auto/${image}`;
        } else {
          return image;
        }
      }
      if (this.recipe.image) {
        if (
          typeof this.recipe.image === 'object' &&
          this.recipe.image !== null &&
          !Array.isArray(this.recipe.image)
        ) {
          const { url, width, height } = this.recipe.image;
          return { url: cloudinaryify(url), width, height };
        } else if (Array.isArray(this.recipe.image)) {
          return { url: cloudinaryify(this.recipe.image[0]) };
        } else {
          return { url: cloudinaryify(this.recipe.image) };
        }
      } else {
        return null;
      }
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
