<template>
  <div class="recipe">
    <h1>{{ name }}</h1>
    <p>
      <span v-if="!showDescription">
        <span>{{ truncate(description, 120) }}</span>
        <b-link
          v-if="description && description.length > 120"
          class="text-primary"
          @click.prevent="showDescription = !showDescription"
          >Read more</b-link
        >
      </span>
      <span v-if="showDescription">
        <span>{{ description }}</span>
        <b-link
          class="text-primary"
          @click.prevent="showDescription = !showDescription"
          >Read less</b-link
        >
      </span>
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
    <div v-else-if="imageData && imageData.src">
      <b-img
        :xsrc="imageData.src"
        :srcset="imageData.srcset"
        :alt="name"
        throttle="100"
        itemprop="image"
        :width="640"
        :height="360"
        fluid
        fluid-grow
        blank-src
        center
        sizes="(max-width: 1140px) 100vw, 1140px"
        block
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

    <section v-if="keywords" class="mb-2 d-print-none">
      <h2 class="h4">Tags</h2>
      <div class="list-group-flush">
        <keywords
          :tags="keywords.split(',')"
          :label="null"
          class="list-group-item"
        />
      </div>
    </section>

    <section v-if="sameAs" class="d-print-none">
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
import {
  BCollapse,
  VBToggle,
  BRow,
  BCol,
  BFormRating,
  BLink,
} from 'bootstrap-vue';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';
import 'plyr/dist/plyr.css';
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
    BLink,
    // VChip,
  },
  directives: { 'b-toggle': VBToggle },
  inheritAttrs: false,
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    suitableForDiet: { type: String, required: false },
    author: {
      type: Object,
      required: false,
      default: () => ({
        '@type': 'Person',
        name: 'Damien Robinson',
      }),
    },
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
    image: { type: [Object, Array, String], required: false },
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
  data: () => ({ showDescription: false }),
  computed: {
    imageData() {
      function cloudinaryify(image) {
        if (!image.startsWith('https://res.cloudinary.com')) {
          return {
            src: `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_640,h_360,ar_16:9,c_fill,f_auto,q_auto/${image}`,
            srcset: [
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_320,h_180,ar_16:9,c_fill,f_auto,q_auto/${image} 320w`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_640,h_360,ar_16:9,c_fill,f_auto,q_auto/${image} 640w`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_768,h_432,ar_16:9,c_fill,f_auto,q_auto/${image} 768w`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_1024,h_576,ar_16:9,c_fill,f_auto,q_auto/${image} 1024w`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_1280,h_720,ar_16:9,c_fill,f_auto,q_auto/${image} 1280w`,
              `https://res.cloudinary.com/pocketpasta/image/fetch/fl_progressive/w_1366,h_768,ar_16:9,c_fill,f_auto,q_auto/${image} 1366w`,
            ],
          };
        } else {
          return {
            src: image,
          };
        }
      }
      if (this.image) {
        if (
          typeof this.image === 'object' &&
          this.image !== null &&
          !Array.isArray(this.image)
        ) {
          const { url } = this.image;
          return cloudinaryify(url);
        } else if (Array.isArray(this.image)) {
          return cloudinaryify(this.image[0]);
        } else {
          return cloudinaryify(this.image);
        }
      } else {
        return null;
      }
    },
    linkData() {
      return {
        ...this.$props,
        '@type': 'Recipe',
        '@context': 'http://schema.org/',
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
