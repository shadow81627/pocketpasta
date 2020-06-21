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
            :key="`${item['@type']}-${item.slug}`"
            v-bind="item"
            :type="item['@type']"
            :layout="layout"
          />
        </div>
      </div>
    </div>

    <client-only>
      <div v-show="list && list.length > 0 && pages > 1" class="overflow-auto">
        <b-pagination-nav
          v-model="page"
          :link-gen="linkGen"
          :number-of-pages="pages"
          use-router
          align="center"
          :per-page="limit"
          size="lg"
          exact
        />
        <button v-show="false" @click="$fetch">Refresh</button>
        <div v-show="false">Total: {{ total }}</div>
        <div v-show="false">Pending: {{ $fetchState.pending }}</div>
        <div v-show="$fetchState.error">Error: {{ $fetchState.error }}</div>
      </div>
    </client-only>
  </div>
</template>

<script>
import ViewSwitcher from '@/components/List/ViewSwitcher';
import Card from '@/components/List/Card';
import { BPaginationNav } from 'bootstrap-vue';
export default {
  components: {
    ViewSwitcher,
    Card,
    BPaginationNav,
  },
  props: {
    collection: { type: String, required: true },
    heading: { type: String, default: '' },
    layout: { type: String, default: null },
    deep: { type: Boolean, default: false },
    fetchOnServer: { type: Boolean, default: false },
    defaultLimit: { type: Number, default: 5 },
  },
  async fetch() {
    this.total = (
      await this.$content(this.collection, { deep: this.deep })
        .only(['id'])
        .where({ '@type': { $ne: 'Offer' } })
        .fetch()
    ).length;
    this.list = await this.$content(this.collection, { deep: this.deep })
      .only(['id', 'slug', 'name', 'description', 'image', '@type'])
      .where({ '@type': { $ne: 'Offer' } })
      .sortBy('createdAt', 'desc')
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();
  },
  fetchOnServer() {
    return this.fetchOnServer;
  },
  data: () => ({ list: [], total: null }),
  computed: {
    layoutClass() {
      // list layout is no class
      return {
        'card-group': this.layout === 'group',
        'card-deck': this.layout === 'deck',
        'card-columns': this.layout === 'columns',
      };
    },
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
    query({ page = this.page, limit = this.limit }) {
      return {
        page: page !== 1 ? page : undefined,
        limit: limit !== this.defaultLimit ? limit : undefined,
      };
    },
  },
};
</script>
