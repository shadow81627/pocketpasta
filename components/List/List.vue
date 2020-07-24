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
      :items-per-page="infinite ? total : limit"
      item-key="slug"
    >
      <template v-slot:header>
        <list-header
          :headers="headers"
          :direction.sync="direction"
          :sort-by.sync="sortBy"
          :search.sync="search"
          :group-by.sync="groupBy"
          :limit.sync="limit"
          :view.sync="view"
        />
      </template>
      <template v-slot:default="{ items }">
        <virtual-list
          data-key="slug"
          :data-sources="items"
          :data-component="ItemComponent"
          page-mode
          wrap-class="row"
          item-class="d-flex flex-column col-12"
          :item-class-add="itemClass"
          :extra-props="{ view }"
          @tobottom="onScrollToBottom"
        />
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-col>
            <client-only>
              <v-pagination v-model="page" :length="pages" total-visible="9" />
              <!-- <button v-show="false" @click="$fetch">Refresh</button> -->
              <div v-show="false">Total: {{ total }}</div>
            </client-only>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <!-- <v-btn
      v-show="infinite"
      bottom
      right
      fixed
      fab
      class="bg-primary"
      @click="scrollToTop"
    >
      <v-icon>{{ mdiArrowUpBold }}</v-icon>
    </v-btn> -->
  </v-container>
</template>

<script>
import {
  mdiSortAlphabeticalAscending,
  mdiSortAlphabeticalDescending,
  mdiSortVariant,
  mdiMagnify,
  mdiSelectGroup,
  mdiArrowUpBold,
} from '@mdi/js';
import { chunk, head } from 'lodash-es';
import VirtualList from 'vue-virtual-scroll-list';

import ItemComponent from '@/components/List/ItemComponent.vue';
import ListHeader from '@/components/List/ListHeader.vue';
const collections = ['Recipe', 'Product'];
export default {
  components: {
    ListHeader,
    VirtualList,
  },
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: '' },
    layout: { type: String, default: null },
    deep: { type: Boolean, default: false },
    fetchOnServer: { type: Boolean, default: false },
    defaultLimit: { type: Number, default: 12 },
    infinite: { type: Boolean, default: true },
    headers: {
      type: Array,
      default: () => [
        { value: 'createdAt', text: 'Created' },
        { value: 'name', text: 'Name' },
        { value: 'description', text: 'Description' },
      ],
    },
  },
  async fetch() {
    try {
      this.total = (
        await this.$content(this.collection, { deep: this.deep })
          .only(['id'])
          .where({ '@type': { $in: collections } })
          .search(this.search)
          .sortBy(this.sortBy, this.direction)
          .fetch()
      ).length;

      console.log({
        skip: (this.page - 1) * this.limit,
        limit: this.limit,
        reset: this.reset,
        page: this.page,
      });

      const results = await this.$content(this.collection, { deep: this.deep })
        .only(['id', 'slug', 'name', 'description', 'image', '@type'])
        .where({ '@type': { $in: collections } })
        .search(this.search)
        .sortBy(this.sortBy, this.direction)
        .skip((this.page - 1) * this.limit)
        .limit(this.limit)
        .fetch();

      if (this.infinite && !this.reset) {
        this.list = this.list.concat(results);
      } else {
        this.list = results;
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: error.message,
        });
      } else if (!error.response) {
        this.$nuxt.error(error);
      }
    }

    if (process.browser && this.reset) {
      // scroll to top on data change
      this.scrollToTop();
    }
  },
  fetchOnServer() {
    return this.fetchOnServer;
  },
  data: () => ({
    ItemComponent,
    list: [],
    total: null,
    mdiSortAlphabeticalAscending,
    mdiSortAlphabeticalDescending,
    mdiSortVariant,
    mdiMagnify,
    mdiSelectGroup,
    mdiArrowUpBold,
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
        return page <= this.pages ? page : this.pages;
      },
      set(page) {
        this.$router.push({
          query: this.generateQuery({
            page: page <= this.pages ? page : this.pages,
            reset: false,
          }),
        });
      },
    },
    limit: {
      get() {
        const limit = this.defaultLimit === -1 ? this.total : this.defaultLimit;
        return parseInt(this.$route.query.limit, 10) || limit;
      },
      set(limit) {
        this.$router.push({ query: this.generateQuery({ limit }) });
      },
    },
    direction: {
      get() {
        return this.$route.query.direction || 'desc';
      },
      set(direction) {
        this.$router.push({ query: this.generateQuery({ direction }) });
      },
    },
    search: {
      get() {
        return this.$route.query.search || '';
      },
      set(search) {
        this.$router.push({ query: this.generateQuery({ search }) });
      },
    },
    sortBy: {
      get() {
        return this.$route.query.sortBy || 'createdAt';
      },
      set(sortBy) {
        this.$router.push({ query: this.generateQuery({ sortBy }) });
      },
    },
    groupBy: {
      get() {
        return this.$route.query.groupBy;
      },
      set(groupBy) {
        this.$router.push({ query: this.generateQuery({ groupBy }) });
      },
    },
    view: {
      get() {
        return this.$route.query.view || this.layout;
      },
      set(view) {
        this.$router.push({ query: this.generateQuery({ view }) });
      },
    },
    reset: {
      get() {
        return Boolean(this.$route.query.reset ?? true);
      },
      set(reset) {
        this.$router.push({
          query: this.generateQuery({ reset, page: reset ? 1 : this.page }),
        });
      },
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    itemClass(index) {
      const view = this.view;
      return `col-sm-${view === 'columns' ? 6 : 12} col-md-${
        view === 'columns' ? 4 : 12
      } col-lg-${view === 'columns' ? 3 : 12}`;
    },
    onScrollToBottom() {
      if (this.infinite) {
        this.page = this.page++;
      }
    },
    rows(items = this.list) {
      const chunks = chunk(items, 4).map((row) => {
        const slug = `${head(row)['@type']}-${head(row).slug}`;
        return {
          slug,
          content: row,
        };
      });
      console.log(chunks);
      return chunks;
    },
    linkGen(page) {
      return {
        query: this.generateQuery({ page }),
      };
    },
    generateQuery({
      sortBy = this.sortBy,
      page = this.reset ? 1 : this.page,
      limit = this.limit,
      direction = this.direction,
      search = this.search,
      view = this.view,
      reset = true,
    }) {
      // sorted query string for more cache hits
      return Object.fromEntries(
        Object.entries({
          sortBy: sortBy && sortBy !== 'createdAt' ? sortBy : undefined,
          search: search && search !== '' ? search : undefined,
          view: view && view !== this.layout ? view : undefined,
          direction: direction !== 'desc' ? direction : undefined,
          page: page !== 1 ? page : undefined,
          reset,
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
