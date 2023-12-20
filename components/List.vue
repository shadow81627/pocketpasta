<template>
  <v-container>
    <v-row>
      <v-col class="col-auto mr-auto">
        <h1>{{ heading }}</h1>
      </v-col>
    </v-row>

    <v-card dark class="mb-1">
      <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        single-line
        hide-details
        label="Search"
        autocomplete="false"
        @keydown.enter="$event.target.blur()"
      ></v-text-field>
    </v-card>
    <v-progress-circular
      v-if="pending"
      indeterminate
      class="mx-auto d-block"
      size="50"
    ></v-progress-circular>
    <v-row v-else-if="list && Array.isArray(list)">
      <v-col
        v-for="item in list"
        :key="`${item['@type']}-${item.slug}`"
        cols="12"
        :sm="view === 'columns' ? 6 : 12"
        :md="view === 'columns' ? 4 : 12"
        :lg="view === 'columns' ? 3 : 12"
        class="d-flex flex-column"
      >
        <ListCard v-bind="item" :type="item['@type']" :layout="view"></ListCard>
      </v-col>
    </v-row>

    <v-row class="mt-2" align="center" justify="center">
      <v-col>
        <v-pagination
          v-model="page"
          :length="pages"
          total-visible="9"
          @update:model-value="scrollToTop"
        ></v-pagination>
      </v-col>
    </v-row>
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
export default defineNuxtComponent({
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: '' },
    layout: { type: String, default: null },
    deep: { type: Boolean, default: false },
    fetchOnServer: { type: Boolean, default: true },
    defaultLimit: { type: Number, default: 24 },
    infinite: { type: Boolean, default: false },
    headers: {
      type: Array,
      default: () => [
        { value: 'createdAt', text: 'Created' },
        { value: 'name', text: 'Name' },
        { value: 'description', text: 'Description' },
      ],
    },
  },
  async setup(props) {
    const { data: total } = await useAsyncData(
      `recipes-total`,
      function () {
        return queryContent('recipes').count();
      },
      { lazy: false, immediate: true },
    );
    function generateQuery({
      // groupBy = this.groupBy,
      // sortBy = this.sortBy,
      page,
      limit,
      // direction = this.direction,
      search,
      // view = this.view,
      // reset = true,
    }) {
      // sorted query string for more cache hits
      return Object.fromEntries(
        Object.entries({
          // groupBy,
          // sortBy: sortBy && sortBy !== 'createdAt' ? sortBy : undefined,
          search: search && search !== '' ? search : undefined,
          // view: view && view !== this.layout ? view : undefined,
          // direction: direction !== 'desc' ? direction : undefined,
          page: page !== 1 ? page : undefined,
          // reset,
          limit:
            limit !== props.defaultLimit && limit !== total.value
              ? limit
              : undefined,
        }).sort(),
      );
    }
    const limit = computed({
      get() {
        const route = useRoute();
        const limit =
          props.defaultLimit === -1 ? total.value : props.defaultLimit;
        return parseInt(route.query.limit, 10) || limit;
      },
      set(limit) {
        const router = useRouter();
        router.push({ query: generateQuery({ limit }) });
      },
    });
    const pages = computed(() => {
      const pages = Math.ceil(total.value / limit.value);
      return pages || 1;
    });
    const page = computed({
      get() {
        const route = useRoute();
        const page = parseInt(route.query.page, 10) || 1;
        // set page to last page if page is larger than last page
        return page <= pages.value ? page : pages.value;
      },
      set(input) {
        const router = useRouter();
        const page = input <= pages.value ? input : pages.value;
        if (page !== this.page) {
          router.push({
            query: generateQuery({ page: page !== 1 ? page : undefined }),
          });
        }
      },
    });
    const search = computed({
      get() {
        const route = useRoute();
        return route.query.search || '';
      },
      set(search) {
        const router = useRouter();
        router.push({ query: this.generateQuery({ search }) });
      },
    });
    const {
      data: list,
      pending,
      // refresh,
    } = await useAsyncData(
      `recipes`,
      async function () {
        return await queryContent('recipes')
          .only(['id', 'name', 'description', 'image', '@type', '_path'])
          .skip((page.value - 1) * limit.value)
          .limit(limit.value)
          // .search(search.value)
          .find();
      },
      {
        watch: [total, page, limit],
        // immediate: true,
        transform(data) {
          return data.map((item) => {
            const slug = item._path.split('/').pop();
            return { ...item, slug };
          });
        },
      },
    );
    // const route = useRoute();
    // watch(route.query, function () {
    //   useDebounce(async function () {
    //     if (refresh) {
    //       await refresh();
    //     }
    //   }, 250);
    // });
    return {
      total,
      list,
      pending,
      page,
      limit,
      pages,
      search,
      generateQuery,
    };
  },
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
  computed: {
    itemComponent() {
      return process.browser ? ItemComponent : '';
    },
    direction: {
      get() {
        return this.$route.query.direction || 'desc';
      },
      set(direction) {
        this.$router.push({ query: this.generateQuery({ direction }) });
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
    '$route.query': useDebounce(function () {
      // this.refresh();
    }, 250),
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    itemClass() {
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
    linkGen(page) {
      return {
        query: this.generateQuery({ page }),
      };
    },
  },
});
</script>
