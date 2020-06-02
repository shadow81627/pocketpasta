<template>
  <div class="container">
    <list v-bind="{ heading: $t('recipes.heading'), list, layout: 'list' }" />
    <div v-show="list && list.length > 0" class="overflow-auto">
      <b-pagination
        v-model="page"
        :link-gen="linkGen"
        use-router
        align="center"
        :number-of-pages="pages"
        :total-rows="total"
        :per-page="limit"
        size="lg"
      />
      <button v-show="false" @click="$fetch">Refresh</button>
      <div v-show="false">Total: {{ total }}</div>
      <div v-show="false">Pending: {{ $fetchState.pending }}</div>
      <div v-show="$fetchState.error">Error: {{ $fetchState.error }}</div>
    </div>
  </div>
</template>

<script>
import List from '@/components/List/List';
import { BPagination } from 'bootstrap-vue';
export default {
  components: {
    List,
    BPagination,
  },
  async fetch() {
    // this.page = parseInt(this.$route.query.page, 10) || 1;
    this.list = await this.$content('recipes')
      .only(['id', 'slug', 'name', 'description', 'image'])
      .sortBy('updatedAt', 'desc')
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();

    this.total = (await this.$content('recipes').only(['id']).fetch()).length;

    this.pages = this.page + (this.list.length === this.limit ? 1 : 0);
  },
  fetchOnServer: false,
  data: () => ({ list: [], limit: 5, pages: 1, total: null }),
  computed: {
    page: {
      get() {
        return parseInt(this.$route.query.page, 10) || 1;
      },
      set(page) {
        if (page === 1) {
          this.$router.push({ query: { page: undefined } });
        } else {
          this.$router.push({ query: { page } });
        }
      },
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`;
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Easy pasta recipes made with simple ingredients.',
        },
      ],
      link: [],
    };
  },
};
</script>
