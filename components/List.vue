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
      :items-per-page="infinite ? total : limit"
      item-key="slug"
    >
      <!-- <template #header>
        <ListHeader
          v-model:direction="direction"
          v-model:sort-by="sortBy"
          v-model:search="search"
          v-model:group-by="groupBy"
          v-model:limit="limit"
          v-model:view="view"
          :headers="headers"
        />
      </template> -->
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="`${item['@type']}-${item.slug}`"
            cols="12"
            :sm="view === 'columns' ? 6 : 12"
            :md="view === 'columns' ? 4 : 12"
            :lg="view === 'columns' ? 3 : 12"
            class="d-flex flex-column"
          >
            <ListCard
              v-bind="item.raw"
              :type="item.raw['@type']"
              :layout="view"
            ></ListCard>
          </v-col>
        </v-row>
      </template>

      <template #footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-col>
            <v-pagination v-model="page" :length="pages" total-visible="9" />
            <div v-show="false">Total: {{ total }}</div>
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
const collections = ["Recipe", "Product"];
export default {
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: "" },
    layout: { type: String, default: null },
    deep: { type: Boolean, default: false },
    fetchOnServer: { type: Boolean, default: true },
    defaultLimit: { type: Number, default: -1 },
    infinite: { type: Boolean, default: true },
    headers: {
      type: Array,
      default: () => [
        { value: "createdAt", text: "Created" },
        { value: "name", text: "Name" },
        { value: "description", text: "Description" },
      ],
    },
  },
  async setup() {
    const { data: list } = await useAsyncData(
      "recipes",
      () =>
        queryContent("recipes")
          .only(["id", "name", "description", "image", "@type", "_path"])
          .find(),
      {
        transform(data) {
          return data.map((item) => {
            const slug = item._path.split("/").pop();
            return { ...item, slug };
          });
        },
      },
    );
    return { list };
  },
  data: () => ({
    total: null,
  }),
  // async fetch() {
  //   try {
  //     this.total = (
  //       this.search
  //         ? await this.$content(this.collection, { deep: this.deep })
  //             .only(["id"])
  //             .where({ "@type": { $in: collections } })
  //             .search(this.search)
  //             .sortBy(this.sortBy, this.direction)
  //             .fetch()
  //         : await this.$content(this.collection, { deep: this.deep })
  //             .only(["id"])
  //             .where({ "@type": { $in: collections } })
  //             .sortBy(this.sortBy, this.direction)
  //             .fetch()
  //     ).length;

  //     const content = this.$content(this.collection, { deep: this.deep })
  //       .only(["id", "slug", "name", "description", "image", "@type"])
  //       .where({ "@type": { $in: collections } })
  //       .sortBy(this.sortBy, this.direction)
  //       .skip((this.page - 1) * this.limit)
  //       .limit(this.limit);

  //     const results = this.search
  //       ? await content.search(this.search).fetch()
  //       : await content.fetch();

  //     if (this.infinite && !this.reset) {
  //       this.list = this.list.concat(results);
  //     } else {
  //       this.list = results;
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status !== 404) {
  //       this.$nuxt.error({
  //         statusCode: error.response.status,
  //         message: error.message,
  //       });
  //     } else if (!error.response) {
  //       this.$nuxt.error(error);
  //     }
  //   }

  //   if (process.browser && this.reset) {
  //     // scroll to top on data change
  //     this.scrollToTop();
  //   }
  // },
  fetchOnServer() {
    return this.fetchOnServer;
  },
  computed: {
    itemComponent() {
      return process.browser ? ItemComponent : "";
    },
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
      set(value) {
        const page = value <= this.pages ? value : this.pages;
        if (page !== this.page) {
          this.$router.push({
            query: this.generateQuery({
              page,
              reset: false,
            }),
          });
        }
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
        return this.$route.query.direction || "desc";
      },
      set(direction) {
        this.$router.push({ query: this.generateQuery({ direction }) });
      },
    },
    search: {
      get() {
        return this.$route.query.search || "";
      },
      set(search) {
        this.$router.push({ query: this.generateQuery({ search }) });
      },
    },
    sortBy: {
      get() {
        return this.$route.query.sortBy || "createdAt";
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
    "$route.query": useDebounce(function () {
      // this.$fetch();
    }, 250),
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    itemClass(index) {
      const view = this.view;
      return `col-sm-${view === "columns" ? 6 : 12} col-md-${
        view === "columns" ? 4 : 12
      } col-lg-${view === "columns" ? 3 : 12}`;
    },
    onScrollToBottom() {
      if (this.infinite) {
        this.page = this.page++;
      }
    },
    linkGen(page) {
      return {
        query: this.generateQuery({ page }),
      };
    },
    generateQuery({
      groupBy = this.groupBy,
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
          groupBy,
          sortBy: sortBy && sortBy !== "createdAt" ? sortBy : undefined,
          search: search && search !== "" ? search : undefined,
          view: view && view !== this.layout ? view : undefined,
          direction: direction !== "desc" ? direction : undefined,
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
