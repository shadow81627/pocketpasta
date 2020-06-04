<template>
  <div>
    <div class="row">
      <div class="col-auto mr-auto">
        <h1>{{ heading }}</h1>
      </div>
      <div class="col-auto ml-auto my-auto">
        <view-switcher v-model="layout" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card-layout" :class="layoutClass">
          <card
            v-for="item in list"
            :key="item.slug"
            v-bind="item"
            :layout="layout"
          />
        </div>
      </div>
    </div>

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
import ViewSwitcher from '@/components/List/ViewSwitcher';
import Card from '@/components/List/Card';
import { BPagination } from 'bootstrap-vue';
export default {
  components: {
    ViewSwitcher,
    Card,
    BPagination,
  },
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: '' },
    layout: { type: String, default: null },
  },
  async fetch() {
    // this.page = parseInt(this.$route.query.page, 10) || 1;
    this.list = await this.$content(this.collection)
      .only(['id', 'slug', 'name', 'description', 'image'])
      .sortBy('updatedAt', 'desc')
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();
    this.total = (
      await this.$content(this.collection).only(['id']).fetch()
    ).length;
    this.pages = this.page + (this.list.length === this.limit ? 1 : 0);
  },
  fetchOnServer: false,
  data: () => ({ list: [], limit: 5, pages: 1, total: null }),
  computed: {
    layoutClass() {
      // list layout is no class
      return {
        'card-group': this.layout === 'group',
        'card-deck': this.layout === 'deck',
        'card-columns': this.layout === 'columns',
      };
    },
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
};
</script>
