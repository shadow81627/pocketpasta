<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Tasks</h1>
        <v-data-table
          :headers="headers"
          :items="items"
          multi-sort
          class="elevation-1"
          :group-by.sync="groupBy"
          item-key="_id"
          mobile-breakpoint="0"
          :loading="$fetchState.pending"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="total"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
                clearable
              >
                <v-icon slot="prepend">{{ icons.mdiMagnify }}</v-icon>
              </v-text-field>
              <v-spacer />
              <v-select
                v-model="groupBy"
                :items="headers.filter((item) => item.text)"
                label="Group by"
                single-line
                hide-details
              >
                <v-icon slot="prepend">{{ icons.mdiSelectGroup }}</v-icon>
              </v-select>
              <v-spacer />
            </v-toolbar>
          </template>

          <template v-slot:item.done="{ item }">
            <v-simple-checkbox v-model="item.done" @input="save(item)" />
          </template>

          <template v-slot:item.name="{ item }">
            <v-text-field
              v-if="
                item.isNew ||
                !item.name ||
                (item.name && item.name.length === 0)
              "
              :value="item.name"
              label="Name"
              single-line
              hide-details
              clearable
              autofocus
              dense
              solo-inverted
              @change="
                (value) => {
                  item.isNew = false;
                  item.name = value;
                  save(item);
                }
              "
            />
            <v-edit-dialog
              v-else
              :return-value.sync="item.name"
              large
              @save="
                item.isNew = false;
                save(item);
              "
            >
              {{ item.name }}
              <template v-slot:input>
                <v-text-field
                  v-model="item.name"
                  label="Name"
                  single-line
                  counter
                  clearable
                  autofocus
                />
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.due="{ item }">
            <v-edit-dialog
              :return-value.sync="item.due"
              large
              @save="save(item)"
            >
              <v-chip
                :color="
                  !item.done &&
                  DateTime.fromISO(item.due) <
                    DateTime.local().minus({ days: 1 })
                    ? 'red'
                    : null
                "
                >{{
                  DateTime.fromISO(item.due).toLocaleString(DateTime.DATE_FULL)
                }}</v-chip
              >
              &nbsp;
              {{ DateTime.fromISO(item.due).toRelativeCalendar() }}
              <template v-slot:input>
                <v-date-picker v-model="item.due" scrollable />
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.actions="{ item }">
            <!-- <v-btn icon title="edit" @click="editItem(item)">
              <v-icon>
                {{ icons.mdiPencil }}
              </v-icon>
            </v-btn> -->
            <v-btn icon title="delete" @click="deleteItem(item)">
              <v-icon>
                {{ icons.mdiDelete }}
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-btn bottom right fixed fab class="bg-primary" @click="create">
          <v-icon>{{ icons.mdiPlus }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Ripple } from 'vuetify/lib/directives';
import {
  mdiPencil,
  mdiDelete,
  mdiMagnify,
  mdiSelectGroup,
  mdiCalendar,
  mdiPlus,
} from '@mdi/js';
import { DateTime } from 'luxon';

export default {
  directives: {
    Ripple,
  },
  async fetch() {
    // const { rows } = await this.$pouch.allDocs({
    //   include_docs: true,
    //   descending: true,
    // });

    // this.items = (rows || []).map((row) => row.doc);

    this.total = (
      await this.$pouch.find({
        selector: {
          name: { $gte: this.search },
        },
        sort: this.sort,
      })
    ).docs.length;

    const result = await this.$pouch.find({
      selector: {
        name: { $gte: this.search },
      },
      sort: this.sort,
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
      execution_stats: true,
    });
    const { docs } = result;
    this.items = docs || [];
    console.log(result);
  },
  fetchOnServer: false,
  data: () => ({
    total: null,
    defaultLimit: 10,
    DateTime,
    groupBy: null,
    newDueMenu: false,
    icons: {
      mdiPencil,
      mdiDelete,
      mdiMagnify,
      mdiSelectGroup,
      mdiCalendar,
      mdiPlus,
    },
    dialog: false,
    headers: [
      { value: 'done', align: 'start', width: 1 },
      {
        text: 'Task',
        value: 'name',
        align: 'start',
      },
      { text: 'Due', value: 'due' },
      // { text: 'Category', value: 'category' },
      {
        value: 'actions',
        sortable: false,
        filterable: false,
        align: 'right',
        width: 1,
      },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      type: 'task',
      name: '',
      due: DateTime.local().toISODate(),
      done: false,
      isNew: false,
    },
    defaultItem: {
      type: 'task',
      name: '',
      due: DateTime.local().toISODate(),
      done: false,
      isNew: true,
    },
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
        const limit =
          parseInt(this.$route.query.limit, 10) || this.defaultLimit;
        return limit === -1 ? this.total : limit;
      },
      set(limit) {
        this.$router.push({ query: this.query({ limit }) });
      },
    },
    direction: {
      get() {
        return this.$route.query.direction || 'desc';
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
        return this.$route.query.sortBy || ['name'];
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
    dialog(val) {
      val || this.close();
    },
    '$route.query': '$fetch',
  },
  mounted() {
    this.$pouch
      .changes({
        since: 'now',
        live: true,
      })
      .on('change', this.$fetch);
  },
  methods: {
    async deleteItem(item) {
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        await this.$pouch.remove(item);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async create() {
      await this.$pouch.post(this.defaultItem);
    },

    async save(item) {
      await this.$pouch.put(item);
      this.close();
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
          direction: direction !== 'desc' ? direction : undefined,
          page: page !== 1 ? page : undefined,
          limit:
            limit !== this.defaultLimit && limit !== this.total
              ? limit
              : undefined,
        }).sort(),
      );
    },
  },

  head() {
    return {
      title: 'Tasks',
    };
  },
};
</script>
