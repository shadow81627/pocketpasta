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
        :total-rows="pages"
        :per-page="1"
        size="lg"
      />
      <button v-show="false" @click="$fetch">Refresh</button>
      <span v-show="false">Pending: {{ $fetchState.pending }}</span>
      <span v-show="$fetchState.error">Error: {{ $fetchState.error }}</span>
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
    this.page = parseInt(this.$route.query.page, 10) || 1;
    this.list = await this.$content('recipes')
      .only(['id', 'slug', 'name', 'description', 'image'])
      .sortBy('updatedAt', 'desc')
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();

    this.pages = this.page + (this.list.length === this.limit ? 1 : 0);
  },
  fetchOnServer: false,
  data: () => ({ list: [], limit: 5, pages: 1 }),
  computed: {
    page: {
      get() {
        return parseInt(this.$route.query.page, 10) || 1;
      },
      set(page) {
        this.$router.push({ query: { page } });
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
