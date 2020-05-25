<template>
  <div class="container">
    <list v-bind="{ heading: $t('recipes.heading'), list, layout: 'list' }" />
    <div class="overflow-auto">
      <b-pagination-nav
        :value="page"
        :link-gen="linkGen"
        use-router
        align="center"
        :number-of-pages="pages"
      />
    </div>
  </div>
</template>

<script>
import List from '@/components/List/List';
import { BPaginationNav } from 'bootstrap-vue';
export default {
  components: {
    List,
    BPaginationNav,
  },
  async fetch() {
    this.page = parseInt(this.$route.query.page, 10) || 1;
    this.list = await this.$content('recipes')
      .only(['id', 'slug', 'name', 'description', 'image'])
      .sortBy('updatedAt')
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();

    this.pages = this.page + (this.list.length === this.limit ? 1 : 0);
  },
  data: () => ({ list: [], limit: 5, pages: 1, page: 1 }),
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
