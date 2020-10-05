<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Shopping</h1>
        <v-data-table
          :headers="headers"
          :items="items"
          multi-sort
          class="elevation-1"
          :group-by.sync="groupBy"
          item-key="id"
          mobile-breakpoint="0"
          :loading="$fetchState.pending"
          :items-per-page.sync="limit"
          :page.sync="page"
          :sort-by.sync="sortBy"
          hide-default-footer
        >
          <template #top>
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

          <template #[`group.header`]="{ group, groupItems }">
            <td :colspan="headers.length" class="item handle">
              <v-container class="pa-0">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-if="!group || (group && group.length === 0)"
                      :value="group"
                      :label="
                        headers
                          .filter((item) => item.text)
                          .find((item) => item.value === groupBy).text
                      "
                      name="shopping-category"
                      single-line
                      hide-details
                      clearable
                      dense
                      solo-inverted
                      @change="
                        (value) => {
                          bulkUpdateAttribute({
                            items: groupItems,
                            key: 'category',
                            value,
                          });
                        }
                      "
                    />
                    <v-edit-dialog v-else large>
                      {{ group }}
                      <template #input>
                        <v-text-field
                          :value="group"
                          label="Category"
                          name="shopping-category"
                          single-line
                          counter
                          clearable
                          @change="
                            (value) => {
                              bulkUpdateAttribute({
                                items: groupItems,
                                key: 'category',
                                value,
                              });
                            }
                          "
                        />
                      </template>
                    </v-edit-dialog>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      small
                      icon
                      class="bg-primary"
                      @click="create({ ...defaultItem(), category: group })"
                    >
                      <v-icon>{{ icons.mdiPlus }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </td>
          </template>

          <template #[`item.done`]="{ item }">
            <v-simple-checkbox
              :value="item.done"
              @input="
                (value) => {
                  item.atomicSet('done', value);
                }
              "
            />
          </template>

          <template #[`item.name`]="{ item }">
            <v-edit-dialog large>
              {{ item.name }}
              <template #input>
                <v-text-field
                  :value="item.name"
                  label="Name"
                  name="shopping-name"
                  single-line
                  counter
                  clearable
                  @input="
                    (value) => {
                      item.atomicSet('name', value);
                    }
                  "
                />
              </template>
            </v-edit-dialog>
          </template>

          <template #[`item.category`]="{ item }">
            <v-text-field
              v-if="
                item.isNew ||
                !item.category ||
                (item.category && item.category.length === 0)
              "
              :value="item.category"
              label="category"
              name="shopping-category"
              single-line
              hide-details
              clearable
              dense
              solo-inverted
              @change="
                (value) => {
                  item.isNew = false;
                  item.category = value;
                  save(item);
                }
              "
            />
            <v-edit-dialog
              v-else
              :return-value.sync="item.category"
              large
              @save="
                item.isNew = false;
                save(item);
              "
            >
              {{ item.category }}
              <template #input>
                <v-text-field
                  v-model="item.category"
                  label="category"
                  name="shopping-category"
                  single-line
                  counter
                  clearable
                />
              </template>
            </v-edit-dialog>
          </template>

          <template #[`item.due`]="{ item }">
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
              <template #input>
                <v-date-picker v-model="item.due" scrollable />
              </template>
            </v-edit-dialog>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn icon title="edit" @click="editItem(item)">
              <v-icon>
                {{ icons.mdiPencil }}
              </v-icon>
            </v-btn>
            <confirm-dialog @confirm="deleteItem(item)" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <confirm-dialog
          v-if="items.length"
          action="delete all your items"
          @confirm="clear(items)"
        >
          <template #activator="{ on, attrs }">
            <v-btn color="danger" v-bind="attrs" v-on="on">Clear All</v-btn>
          </template>
        </confirm-dialog>

        <v-dialog v-model="dialog" persistent max-width="400">
          <template #activator="{ on, attrs }">
            <v-btn
              bottom
              right
              fixed
              fab
              aria-label="Create a new Shopping list item"
              class="bg-primary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ icons.mdiPlus }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Shopping</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.category"
                      label="Category"
                      name="shopping-category"
                      @keydown.enter="save(editedItem)"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      name="shopping-name"
                      required
                      autofocus
                      @keydown.enter="save(editedItem)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="close">Close</v-btn>
              <v-btn color="primary" @click="save(editedItem)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import cuid from 'cuid';
import { debounce } from 'lodash-es';

import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ListHeader from '@/components/List/ListHeader.vue';

export default {
  components: {
    ConfirmDialog,
    ListHeader,
  },

  directives: {
    Ripple,
  },
  data: () => ({
    categories: [],
    total: 10,
    defaultLimit: -1,
    DateTime,
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
    deleteDialog: false,
    headers: [
      { value: 'done', align: 'start', width: 1 },
      {
        text: 'Name',
        value: 'name',
        align: 'start',
        groupable: false,
      },
      { text: 'Category', value: 'category', groupable: true },
      {
        value: 'actions',
        sortable: false,
        filterable: false,
        align: 'right',
        width: 'auto',
      },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      id: `${cuid()}`,
      name: '',
      due: DateTime.local().toISODate(),
      category: '',
      done: false,
    },
  }),
  fetch() {
    const query = this.$db.shopping.find({
      selector: {
        name: { $regex: `.*${this.search}.*` },
      },
    });
    this.collection = query;
    query.$.subscribe((results = []) => {
      this.total = results.length;
      this.items = results;
    });
  },
  fetchOnServer: false,
  head() {
    return {
      title: 'Shopping',
    };
  },
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
        const sortBy = this.$route.query.sortBy ?? 'category';
        return this.items.length ? sortBy : null;
      },
      set(sortBy) {
        this.$router.push({ query: this.query({ sortBy }) });
      },
    },
    groupBy: {
      get() {
        const groupBy = this.$route.query.groupBy ?? 'category';
        return this.items.length ? groupBy : null;
      },
      set(groupBy) {
        this.$router.push({ query: this.query({ groupBy }) });
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
    '$route.query': debounce(function () {
      this.$fetch();
    }, 500),
  },
  methods: {
    defaultItem: () => ({
      id: `${cuid()}`,
      name: '',
      category: '',
      due: DateTime.local().toISODate(),
      done: false,
    }),

    editItem(item) {
      this.editedItem = item.toJSON();
      this.dialog = true;
    },
    async deleteItem(item) {
      await item.remove();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem());
        this.editedIndex = -1;
      });
    },

    create(item = this.defaultItem()) {
      this.editedItem = item;
      this.dialog = true;
    },

    async save(item) {
      await this.$db.shopping.upsert(item);
      this.close();
    },

    clear(items) {
      this.collection.remove();
    },

    async bulkUpdateAttribute({ items, key, value }) {
      await Promise.all(items.map((item) => item.atomicSet(key, value)));
    },

    query({
      sortBy = this.sortBy,
      groupBy = this.groupBy,
      page = this.page,
      limit = this.limit,
      direction = this.direction,
      search = this.search,
      view = this.view,
    }) {
      // sorted query string for more cache hits
      return Object.fromEntries(
        Object.entries({
          sortBy: sortBy && sortBy !== 'category' ? sortBy : undefined,
          groupBy: groupBy && groupBy !== 'category' ? groupBy : undefined,
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
};
</script>
