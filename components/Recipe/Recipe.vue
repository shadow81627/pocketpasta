<template>
  <div class="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>

    <vue-plyr
      v-if="
        recipe.video &&
        recipe.video.embedUrl &&
        recipe.video.embedUrl.includes('youtube')
      "
    >
      <div
        data-plyr-provider="youtube"
        :data-plyr-embed-id="recipe.video.embedUrl"
        style="padding-top: 56.25%;"
      />
    </vue-plyr>
    <div v-else-if="imageData && imageData.url">
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
      <number-text :text="recipe.recipeYield" />
    </p>
    <b-row>
      <b-col md="6">
        <b-card
          v-if="recipe.recipeIngredient"
          no-body
          tag="section"
          class="mb-4"
        >
          <b-card-header header-tag="header" class="p-1 text-left" role="tab">
            <b-button
              v-b-toggle:collapse-ingredient
              block
              variant="none"
              squared
              class="text-left"
              ><h2>Ingredients</h2></b-button
            >
          </b-card-header>
          <b-collapse id="collapse-ingredient" visible>
            <b-card-body>
              <ol class="list-group-flush pl-0 mb-0">
                <li
                  v-for="ingredient in recipe.recipeIngredient"
                  :key="ingredient"
                  class="list-group-item"
                >
                  <fraction-text :text="ingredient" />
                </li>
              </ol>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card
          v-if="recipe.recipeInstructions"
          no-body
          tag="section"
          class="mb-4"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              v-b-toggle:collapse-instructions
              block
              variant="none"
              squared
              class="text-left"
              ><h2>Instructions</h2></b-button
            >
          </b-card-header>
          <b-collapse id="collapse-instructions" visible>
            <b-card-body>
              <ol
                v-if="Array.isArray(recipe.recipeInstructions)"
                class="list-group-flush pl-0 mb-0"
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
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>

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
import { BCollapse, VBToggle, BRow, BCol } from 'bootstrap-vue';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';
import 'plyr/dist/plyr.css';
export default {
  components: {
    NumberText,
    FractionText,
    Keywords,
    Share,
    NutritionFactTable,
    BCollapse,
    BRow,
    BCol,
    VuePlyr,
  },
  directives: { 'b-toggle': VBToggle },
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
