<template>
  <v-container>
    <v-row>
      <v-col class="col-auto mr-auto">
        <h1>{{ heading }}</h1>
      </v-col>
    </v-row>

    <v-data-iterator
      :items="list"
      hide-default-footer
      :loading="$fetchState.pending"
      :items-per-page="limit"
    >
      <template v-slot:header>
        <v-card dark color="primary" class="mb-1">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" md="">
                <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="$search"
                  label="Search"
                  autocomplete="false"
                />
              </v-col>

              <v-col cols="auto">
                <v-container fluid class="pa-0">
                  <v-row no-gutters>
                    <v-col>
                      <v-select
                        v-model="sortBy"
                        flat
                        solo-inverted
                        hide-details
                        :items="keys"
                        :prepend-inner-icon="mdiSortVariant"
                        label="Sort by"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-btn-toggle v-model="direction" mandatory tile>
                        <v-btn
                          depressed
                          color="blue"
                          value="asc"
                          aria-label="sort ascending"
                        >
                          <v-icon>{{ mdiSortAlphabeticalAscending }}</v-icon>
                        </v-btn>
                        <v-btn
                          depressed
                          color="blue"
                          value="desc"
                          aria-label="sort descending"
                        >
                          <v-icon>{{ mdiSortAlphabeticalDescending }}</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="auto">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn large text v-bind="attrs" v-on="on">
                      {{ limit }}
                      <span> per page</span>
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in limits"
                      :key="index"
                      @click="limit = number"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <view-switcher v-model="view" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="`${item['@type']}-${item.slug}`"
            cols="12"
            :sm="view === 'columns' ? 6 : 12"
            :md="view === 'columns' ? 4 : 12"
            :lg="view === 'columns' ? 3 : 12"
            class="d-flex flex-column"
          >
            <card v-bind="item" :type="item['@type']" :layout="view" />
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-col>
            <v-pagination v-model="page" :length="pages" total-visible="9" />
            <button v-show="false" @click="$fetch">Refresh</button>
            <div v-show="false">Total: {{ total }}</div>
            <div v-show="$fetchState.error">Error: {{ $fetchState.error }}</div>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import {
  mdiSortAlphabeticalAscending,
  mdiSortAlphabeticalDescending,
  mdiSortVariant,
} from '@mdi/js';
import ViewSwitcher from '@/components/List/ViewSwitcher';
import Card from '@/components/List/Card';
const collections = ['Recipe', 'Product'];
export default {
  components: {
    ViewSwitcher,
    Card,
  },
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: '' },
    layout: { type: String, default: null },
    deep: { type: Boolean, default: false },
    fetchOnServer: { type: Boolean, default: false },
    defaultLimit: { type: Number, default: 4 },
  },
  async fetch() {
    this.total = (
      await this.$content(this.collection, { deep: this.deep })
        .only(['id'])
        .where({ '@type': { $in: collections } })
        .search(this.search)
        .sortBy(this.sortBy, this.direction)
        .fetch()
    ).length;
    this.list = await this.$content(this.collection, { deep: this.deep })
      .only(['id', 'slug', 'name', 'description', 'image', '@type'])
      .where({ '@type': { $in: collections } })
      .search(this.search)
      .sortBy(this.sortBy, this.direction)
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();

    if (process.browser) {
      // scroll to top on data change
      window.scrollTo(0, 0);
    }
  },
  fetchOnServer() {
    return this.fetchOnServer;
  },
  data: () => ({
    list: [],
    keys: ['createdAt', 'name', 'description'],
    total: null,
    limits: [4, 8, 12],
    mdiSortAlphabeticalAscending,
    mdiSortAlphabeticalDescending,
    mdiSortVariant,
  }),
  computed: {
    pages() {
      const pages = Math.ceil(this.total / this.limit);
      return pages || 1;
    },
    page: {
      get() {
        const page = parseInt(this.$route.query.page, 10) || 1;
        // set page to last page if page is larger than last page
        if (page <= this.pages) {
          return page;
        } else {
          return this.pages;
        }
      },
      set(page) {
        this.$router.push({ query: this.query({ page }) });
      },
    },
    limit: {
      get() {
        const limit = this.defaultLimit === -1 ? this.total : this.defaultLimit;
        return parseInt(this.$route.query.limit, 10) || limit;
      },
      set(limit) {
        this.$router.push({ query: this.query({ limit }) });
      },
    },
    direction: {
      get() {
        return this.$route.query.direction;
      },
      set(direction) {
        this.$router.push({ query: this.query({ direction }) });
      },
    },
    search: {
      get() {
        return this.$route.query.search || '';
      },
      set(search) {
        this.$router.push({ query: this.query({ search }) });
      },
    },
    sortBy: {
      get() {
        return this.$route.query.sortBy || 'createdAt';
      },
      set(sortBy) {
        this.$router.push({ query: this.query({ sortBy }) });
      },
    },
    view: {
      get() {
        return this.$route.query.view || this.layout;
      },
      set(view) {
        this.$router.push({ query: this.query({ view }) });
      },
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    linkGen(page) {
      return {
        query: this.query({ page }),
      };
    },
    query({
      sortBy = this.sortBy,
      page = this.page,
      limit = this.limit,
      direction = this.direction,
      search = this.search,
      view = this.view,
    }) {
      // sorted query string for more cache hits
      return Object.fromEntries(
        Object.entries({
          sortBy: sortBy && sortBy !== 'createdAt' ? sortBy : undefined,
          search: search && search !== '' ? search : undefined,
          view: view && view !== this.layout ? view : undefined,
          direction: direction !== 'asc' ? direction : undefined,
          page: page !== 1 ? page : undefined,
          limit:
            limit !== this.defaultLimit && limit !== this.total
              ? limit
              : undefined,
        }).sort(),
      );
    },
  },
};
</script>
