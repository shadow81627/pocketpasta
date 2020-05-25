<template>
  <div class="container">
    <list v-bind="{ heading: $t('recipes.heading'), list, layout: 'list' }" />
    <div class="overflow-auto">
      <b-pagination-nav
        :value="$route.query.page"
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
    const page = this.$route.query.page || 0;
    this.list = await this.$content('recipes')
      .only(['id', 'name', 'description', 'image'])
      .sortBy('updatedAt')
      .skip((page - 1) * this.limit)
      .limit(this.limit)
      .fetch();
  },
  data: () => ({ list: [], limit: 5 }),
  computed: {
    pages() {
      const page = parseInt(this.$route.query.page, 10) || 1;
      return page + (this.list.length === this.limit ? 1 : 0);
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
