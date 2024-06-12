<template>
  <div class="container">
    <client-only>
      <div class="recipe">
        <h1 itemprop="name">{{ name }}</h1>
        <p itemprop="description">
          <ReadMore :text="description" />
        </p>

        <VuePlyr
          v-if="
            video &&
            video.embedUrl &&
            video.embedUrl.includes('youtube') &&
            videoClicked
          "
          :options="{ autoplay: true }"
        >
          <div
            data-plyr-provider="youtube"
            :data-plyr-embed-id="video.embedUrl"
            style="padding-top: 56.25%"
          />
        </VuePlyr>
        <div v-else-if="imageData">
          <Hero
            :src="imageData"
            :alt="name"
            itemprop="image"
            xcontain
            :gradient="null"
            @click="videoClicked = true"
          >
            <v-container
              v-if="
                video && video.embedUrl && video.embedUrl.includes('youtube')
              "
              fluid
              class="fill-height align-items-end justify-start"
            >
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <button
                    type="button"
                    class="plyr__control plyr__control--overlaid"
                    data-plyr="play"
                    aria-label="Play"
                    style="display: block"
                  >
                    <svg id="plyr-play" viewBox="0 0 18 18">
                      <path
                        d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"
                      />
                    </svg>
                    <span class="plyr__sr-only">Play</span>
                  </button>
                </v-col>
              </v-row>
            </v-container>
          </Hero>
        </div>
        <!-- <p>Author: {{ author }}</p> -->
        <!-- <p>Published: {{ datePublished }}</p> -->

        <section>
          <v-row>
            <v-col>
              <v-chip label style="background: none">
                <span itemprop="ratingValue">{{
                  Number(aggregateRating.ratingValue).toFixed(1)
                }}</span>
                <v-rating
                  dense
                  :value="Number(aggregateRating.ratingValue)"
                  readonly
                />
                <span itemprop="ratingCount"
                  >({{ aggregateRating.ratingCount || 1 }})</span
                >
              </v-chip>
              <v-chip v-if="recipeYield" label style="background: none">{{
                String(recipeYield).match(/(^\d*$)/)
                  ? `${recipeYield} serving${recipeYield > 1 ? 's' : ''}`
                  : recipeYield
              }}</v-chip>
              <v-chip v-if="diet" label style="background: none">
                {{ diet }}
              </v-chip>
              <v-chip
                label
                style="background: none; overflow: visible; padding: 0"
              >
                <Share class="d-inline-block" />
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
                <template #default="props">
                  <ul>
                    <li
                      v-for="item in props.items"
                      :key="item"
                      style="list-style: none; padding-bottom: 12px"
                    >
                      <v-card tile flat class="d-flex">
                        <v-card-title
                          class="text-subtitle-1 text-break text-wrap py-0"
                          >{{ item }}</v-card-title
                        >
                        <v-card-actions class="ml-auto">
                          <v-btn
                            icon
                            aria-label="Add to shopping list"
                            title="Add to shopping list"
                            @click="add(item)"
                          >
                            <v-icon>{{ mdiCartPlus }}</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </li>
                  </ul>
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
                item-key="text"
                hide-default-footer
                :items-per-page="-1"
              >
                <template #default="props">
                  <ol>
                    <li v-for="item in props.items" :key="item.text">
                      <v-card tile flat>
                        <v-card-text
                          class="text-subtitle-1 text-break text-wrap"
                          >{{ item.text }}</v-card-text
                        >
                      </v-card>
                    </li>
                  </ol>
                </template>
              </v-data-iterator>
              <p v-else>{{ recipeInstructions }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <NutritionFactTable
            v-if="nutrition"
            v-bind="nutrition"
            class="mb-4"
          />
          <v-expansion-panel v-if="keywords" class="mb-2 d-print-none">
            <v-expansion-panel-header>
              <h2>Tags</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="list-group-flush">
                <Keywords
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
                  style="max-width: 100%"
                  class="d-inline-block text-truncate"
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
        <Disqus shortname="pocketpasta" style="margin-top: 16px" />
      </div>
      <EditShoppingListItem
        v-model="editedItem"
        :dialog="dialog"
        @dialog="(val) => (dialog = val)"
      >
        <span></span>
      </EditShoppingListItem>
    </client-only>
  </div>
</template>

<script>
import cuid from 'cuid';
import { Disqus } from 'vue-disqus';
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js';
import 'plyr/dist/plyr.css';
import { mdiCartPlus } from '@mdi/js';
export default {
  components: {
    Disqus,
    VuePlyr,
  },
  async asyncData(context) {
    try {
      const id = context.route.params.id;
      const recipe = await context.$content('recipes', id).fetch();
      return {
        id,
        keywords: '',
        recipeIngredient: [],
        author: {
          '@type': 'Person',
          name: 'Damien Robinson',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 4.93,
          ratingCount: 1,
        },
        sameAs: [],
        ...recipe,
        recipe,
      };
    } catch {
      context.error({ statusCode: 404 });
    }
  },
  data() {
    return {
      mdiCartPlus,
      id: 0,
      showDescription: false,
      videoClicked: false,
      editedItem: null,
      dialog: false,
    };
  },
  head() {
    return {
      title: this.name,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.name,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description,
        },
      ],
      script: [
        {
          json: this.linkData(),
          type: 'application/ld+json',
        },
      ],
    };
  },
  computed: {
    imageData() {
      const image = Array.isArray(this.image) ? this.image[0] : this.image;
      if (image) {
        if (
          typeof image === 'object' &&
          image !== null &&
          !Array.isArray(image)
        ) {
          const { url } = image;
          return url;
        } else {
          return image;
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
  },
  mounted() {
    const buttons = document.getElementsByTagName('button');
    Array.from(buttons).map((btn) =>
      btn.setAttribute('aria-label', 'rating-star'),
    );
  },
  methods: {
    async linkData() {
      return {
        ...(await this.$content('recipes', this.id).fetch()),
        '@type': 'Recipe',
        '@context': 'http://schema.org/',
      };
    },
    add(item) {
      this.editedItem = {
        id: `${cuid()}`,
        name: item,
        category: '',
        done: false,
      };
      this.dialog = true;
    },
  },
};
</script>
