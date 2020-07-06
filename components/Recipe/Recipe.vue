<template>
  <div class="recipe">
    <h1 itemprop="name">{{ name }}</h1>
    <p itemprop="description">
      <read-more :text="description" />
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
      <v-img
        :src="imageData.src"
        :srcset="imageData.srcset.join(',')"
        :alt="name"
        itemprop="image"
        :xwidth="640"
        :xheight="360"
        :aspect-ratio="640 / 360"
        sizes="(max-width: 1140px) 100vw, 1140px"
        min-width="100%"
        contain
      />
    </div>
    <!-- <p>Author: {{ author }}</p> -->
    <!-- <p>Published: {{ datePublished }}</p> -->

    <section>
      <v-row>
        <v-col>
          <v-chip label style="background: none;">
            <span itemprop="ratingValue">{{
              Number(aggregateRating.ratingValue).toFixed(1)
            }}</span>
            <v-rating
              dense
              :value="Number(aggregateRating.ratingValue)"
              readonly
            />
            <span itemprop="ratingCount"
              >({{ Number(aggregateRating.ratingCount) }})</span
            >
          </v-chip>
          <v-chip v-if="recipeYield" label style="background: none;">{{
            recipeYield.match(/(\d+)/)
              ? `${recipeYield} serving${recipeYield > 1 ? 's' : ''}`
              : recipeYield
          }}</v-chip>
          <v-chip v-if="diet" label style="background: none;">
            {{ diet }}
          </v-chip>
          <v-chip
            label
            style="background: none; overflow: visible; padding: 0;"
          >
            <share class="d-inline-block" />
          </v-chip>
        </v-col>
      </v-row>
    </section>

    <v-expansion-panels multiple :value="[0, 1, 2]" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2>Ingredients</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content eager>
          <v-data-iterator
            :items="recipeIngredient"
            hide-default-footer
            :items-per-page="-1"
          >
            <template v-slot:default="props">
              <v-card v-for="item in props.items" :key="item" tile flat>
                <v-card-title class="text-break text-wrap">{{
                  item
                }}</v-card-title>
              </v-card>
            </template>
          </v-data-iterator>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="my-4">
        <v-expansion-panel-header
          ><h2>Instructions</h2></v-expansion-panel-header
        >
        <v-expansion-panel-content eager>
          <v-data-iterator
            v-if="Array.isArray(recipeInstructions)"
            :items="recipeInstructions"
            hide-default-footer
            :items-per-page="-1"
          >
            <template v-slot:default="props">
              <ol>
                <li v-for="item in props.items" :key="item.text">
                  <v-card tile flat>
                    <v-card-title class="text-break text-wrap">{{
                      item.text
                    }}</v-card-title>
                  </v-card>
                </li>
              </ol>
            </template>
          </v-data-iterator>
          <p v-else>{{ recipeInstructions }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <nutrition-fact-table v-if="nutrition" v-bind="nutrition" class="mb-4" />
      <v-expansion-panel v-if="keywords" class="mb-2 d-print-none">
        <v-expansion-panel-header>
          <h2>Tags</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="list-group-flush">
            <keywords
              :tags="keywords.split(',')"
              :label="null"
              class="list-group-item"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="sameAs" class="d-print-none">
        <v-expansion-panel-header>
          <h2>References</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="list-group-flush">
            <span
              v-for="reference in sameAs"
              :key="reference"
              class="list-group-item text-truncate"
            >
              <a
                :href="reference"
                target="_blank"
                itemprop="url"
                rel="noopener"
                >{{ reference }}</a
              >
            </span>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import ReadMore from '@/components/ReadMore.vue';
import Keywords from '@/components/Keywords';
import Share from '@/components/Social/Share';
import NutritionFactTable from '@/components/Recipe/NutritionFactTable';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';
import 'plyr/dist/plyr.css';
export default {
  components: {
    Keywords,
    Share,
    NutritionFactTable,
    VuePlyr,
    ReadMore,
  },
  inheritAttrs: false,
  props: {
    name: { type: String, required: false },
    description: { type: String, required: false },
    suitableForDiet: { type: [String, Array], required: false },
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
      const image = Array.isArray(this.image) ? this.image[0] : this.image;
      if (image) {
        if (
          typeof image === 'object' &&
          image !== null &&
          !Array.isArray(image)
        ) {
          const { url } = image;
          return cloudinaryify(url);
        } else {
          return cloudinaryify(image);
        }
      } else {
        return null;
      }
    },
    diet() {
      // allow diet to be a list
      if (this.suitableForDiet) {
        const diet =
          Array.isArray(this.suitableForDiet) && this.suitableForDiet
            ? this.suitableForDiet[0]
            : this.suitableForDiet;
        return diet.replace(/https:\/\/schema.org\/(.*?)Diet/, '$1');
      } else {
        return null;
      }
    },
    linkData() {
      return {
        ...this.$props,
        '@type': 'Recipe',
        '@context': 'http://schema.org/',
      };
    },
  },
  mounted() {
    const buttons = document.getElementsByTagName('button');
    Array.from(buttons).map((btn) =>
      btn.setAttribute('aria-label', 'rating-star'),
    );
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
