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
          item-key="id"
          mobile-breakpoint="0"
          :loading="$fetchState.pending"
          :items-per-page.sync="limit"
          :page.sync="page"
          :server-items-length="total"
          :sort-by.sync="sortBy"
          hide-default-footer
        >
          <template #top>
            <ListHeader
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
                      :name="groupBy"
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
                          label="Name"
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
                      @click="create({ ...defaultItem, category: group })"
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

          <template #[`item.due`]="{ item }">
            <v-edit-dialog large>
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
                <v-date-picker
                  :value="item.due"
                  scrollable
                  @change="
                    (value) =>
                      bulkUpdateAttribute({
                        items: [item],
                        key: 'due',
                        value,
                      })
                  "
                />
              </template>
            </v-edit-dialog>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  title="Edit"
                  aria-label="Edit"
                  v-bind="attrs"
                  @click="editItem(item)"
                  v-on="on"
                >
                  <v-icon>
                    {{ icons.mdiPencil }}
                  </v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>

            <ConfirmDialog @confirm="deleteItem(item)" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ConfirmDialog
          v-if="items.length"
          action="delete all your items"
          @confirm="clear(items)"
        >
          <template #activator="{ on, attrs }">
            <v-btn color="danger" v-bind="attrs" v-on="on"> Clear All </v-btn>
          </template>
        </ConfirmDialog>

        <v-dialog v-model="dialog" persistent max-width="400">
          <template #activator="{ on, attrs }">
            <v-btn
              bottom
              right
              fixed
              fab
              class="bg-primary"
              aria-label="Create a new Task"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ icons.mdiPlus }}</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Task</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.category"
                      label="Category"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      v-model="editDatePickerMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      offset-y
                      top
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="editedItem.due"
                          label="Due Date"
                          :prepend-icon="icons.mdiCalendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedItem.due"
                        scrollable
                        @input="editDatePickerMenu = false"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="close">Close</v-btn>
              <v-btn
                color="primary"
                @click="save(editedItem)"
                @keydown.enter="save(editedItem)"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ListHeader from '@/components/List/ListHeader.vue';
import { init } from '@/db';
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
    editDatePickerMenu: false,
    deleteDialog: false,
    headers: [
      { value: 'done', align: 'start', width: 1 },
      {
        text: 'Task',
        value: 'name',
        align: 'start',
        groupable: false,
      },
      { text: 'Category', value: 'category', groupable: true },
      { text: 'Due', value: 'due' },
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
      id: cuid(),
      name: '',
      due: DateTime.local().toISODate(),
      category: '',
      done: false,
    },
    defaultItem: {
      id: cuid(),
      name: '',
      category: '',
      due: DateTime.local().toISODate(),
      done: false,
    },
  }),
  async fetch() {
    this.$db = await init({
      remote: this.$warehouse.get('dbRemote') || this.$config.DB_REMOTE,
      username: this.$warehouse.get('dbUsername') || this.$config.DB_USERNAME,
      password: this.$warehouse.get('dbPassword') || this.$config.DB_PASSWORD,
    });
    this.collection = this.$db.tasks.find();
    this.sub = this.collection.$.subscribe((results = []) => {
      this.total = results.length;
      this.items = results;
    });
  },
  fetchOnServer: false,

  head() {
    return {
      title: 'Tasks',
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
        const sortBy = this.$route.query.sortBy ?? null;
        return this.items.length ? sortBy : null;
      },
      set(sortBy) {
        this.$router.push({ query: this.query({ sortBy }) });
      },
    },
    groupBy: {
      get() {
        const groupBy = this.$route.query.groupBy ?? null;
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
    '$route.query': '$fetch',
  },
  beforeDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  },
  methods: {
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
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    create(item = this.defaultItem) {
      this.editedItem = item;
      this.dialog = true;
    },

    async save(item) {
      await this.$db.tasks.upsert(item);
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
          sortBy: sortBy && sortBy !== 'name' ? sortBy : undefined,
          groupBy: groupBy && groupBy !== '' ? groupBy : undefined,
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
