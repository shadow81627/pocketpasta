<template>
  <div class="recipe">
    <h1>{{ name }}</h1>
    <p>
      <b-collapse id="recipe__description--summary" visible>
        <span>{{ truncate(description, 120) }}</span>
        <nuxt-link
          v-if="description && description.length > 150"
          v-b-toggle="['recipe__description--summary', 'recipe__description']"
          to=""
          >Read more</nuxt-link
        >
      </b-collapse>
      <b-collapse id="recipe__description">
        <span>{{ description }}</span>
        <nuxt-link
          v-b-toggle="['recipe__description--summary', 'recipe__description']"
          to=""
          >Read less</nuxt-link
        >
      </b-collapse>
    </p>

    <vue-plyr
      v-if="video && video.embedUrl && video.embedUrl.includes('youtube')"
    >
      <div
        data-plyr-provider="youtube"
        :data-plyr-embed-id="video.embedUrl"
        style="padding-top: 56.25%;"
      />
    </vue-plyr>
    <div v-else-if="imageData && imageData.url">
      <b-img-lazy
        :src="imageData.url"
        class="img-fluid mx-auto d-block"
        :alt="name"
        throttle="100"
        itemprop="image"
        :width="640"
        :height="360"
        fluid
        xfluid-grow
      />
    </div>
    <!-- <p>Author: {{ author }}</p> -->
    <!-- <p>Published: {{ datePublished }}</p> -->

    <section>
      <b-row>
        <b-col>
          <v-chip label readonly style="background: none; padding: 0;">
            <b-form-rating
              id="rating"
              :value="aggregateRating.ratingValue"
              readonly
              inline
              no-border
              style="background: none;"
              variant="primary"
              name="rating"
              aria-label="rating"
            />
          </v-chip>
          <v-chip label style="background: none;"
            ><number-text :text="recipeYield"
          /></v-chip>
          <v-chip v-if="suitableForDiet" label style="background: none;">
            {{
              suitableForDiet.replace(/https:\/\/schema.org\/(.*?)Diet/, '$1')
            }}
          </v-chip>
          <v-chip
            label
            style="background: none; overflow: visible; padding: 0;"
          >
            <share class="d-inline-block" />
          </v-chip>
        </b-col>
      </b-row>
    </section>
    <b-row>
      <b-col md="6">
        <b-card v-if="recipeIngredient" no-body tag="section" class="mb-4">
          <b-card-header header-tag="header" class="p-1 text-left">
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
                  v-for="ingredient in recipeIngredient"
                  :key="ingredient"
                  class="list-group-item"
                >
                  {{ ingredient }}
                  <!-- <fraction-text :text="ingredient" /> -->
                </li>
              </ol>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card v-if="recipeInstructions" no-body tag="section" class="mb-4">
          <b-card-header header-tag="header" class="p-1">
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
                v-if="Array.isArray(recipeInstructions)"
                class="list-group-flush pl-0 mb-0"
              >
                <li
                  v-for="instruction in recipeInstructions"
                  :key="instruction.text"
                  class="list-group-item"
                >
                  {{ instruction.text }}
                  <!-- <fraction-text :text="instruction.text" /> -->
                </li>
              </ol>
              <p v-else>{{ recipeInstructions }}</p>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>

    <nutrition-fact-table v-if="nutrition" v-bind="nutrition" class="my-4" />

    <section class="mb-2">
      <h2 class="h4">Tags</h2>
      <div class="list-group-flush">
        <keywords
          :tags="keywords ? keywords.split(',') : []"
          :label="null"
          class="list-group-item"
        />
      </div>
    </section>

    <section v-if="sameAs">
      <h2 class="h4">References</h2>
      <div class="list-group-flush">
        <span
          v-for="reference in sameAs"
          :key="reference"
          class="list-group-item text-truncate"
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
// import FractionText from '@/components/FractionText';
import Keywords from '@/components/Keywords';
import Share from '@/components/Social/Share';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';
import { BCollapse, VBToggle, BRow, BCol, BFormRating } from 'bootstrap-vue';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';
import 'plyr/dist/plyr.css';
// import { VChip } from 'vuetify/lib';
export default {
  components: {
    NumberText,
    // FractionText,
    Keywords,
    Share,
    NutritionFactTable,
    BCollapse,
    BRow,
    BCol,
    VuePlyr,
    BFormRating,
    // VChip,
  },
  directives: { 'b-toggle': VBToggle },
  inheritAttrs: false,
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    suitableForDiet: { type: String, required: false },
    author: { type: Object, required: false },
    nutrition: { type: Object, required: false },
    datePublished: { type: String, required: false },
    keywords: { type: String, required: false },
    recipeIngredient: { type: Array, required: false },
    recipeInstructions: { type: Array, required: false },
    prepTime: { type: String, required: false },
    cookTime: { type: String, required: false },
    totalTime: { type: String, required: false },
    video: { type: Object, required: false },
    recipeYield: { type: String, required: false },
    recipeCategory: { type: String, required: false },
    recipeCuisine: { type: String, required: false },
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
    // updatedAt: { type: Date, default: () => new Date() },
  },
  computed: {
    imageData() {
      function cloudinaryify(image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return `https://res.cloudinary.com/pocketpasta/image/fetch/w_640,h_360,ar_16:9,c_fill,f_auto,q_auto/${image}`;
        } else {
          return image;
        }
      }
      if (this.image) {
        if (
          typeof this.image === 'object' &&
          this.image !== null &&
          !Array.isArray(this.image)
        ) {
          const { url, width, height } = this.image;
          return { url: cloudinaryify(url), width, height };
        } else if (Array.isArray(this.image)) {
          return { url: cloudinaryify(this.image[0]) };
        } else {
          return { url: cloudinaryify(this.image) };
        }
      } else {
        return null;
      }
    },
    linkData() {
      return {
        ...this.$props,
        '@type': 'Recipe',
        // dateModified: this.updatedAt.toISOString(),
        // updatedAt: undefined,
      };
    },
  },

  methods: {
    truncate(text, stop = 150, clamp = '...') {
      if (text) {
        return `${text.slice(0, stop)}${stop < text.length ? clamp : ''}`;
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
