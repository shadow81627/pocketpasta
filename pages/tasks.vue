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
          :xsort-by.sync="groupBy"
          :item-class="draggableIgnore"
          hide-default-footer
        >
          <template v-slot:top>
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

          <template v-slot:group.header="{ headers, group, items }">
            <td :colspan="headers.length" class="item handle">
              <v-container class="pa-0">
                <v-row>
                  <v-col>
                    <v-text-field
                      v-if="!group || (group && group.length === 0)"
                      :value="group"
                      label="Name"
                      single-line
                      hide-details
                      clearable
                      xautofocus
                      dense
                      solo-inverted
                      @change="
                        (value) => {
                          saveCategory({
                            tasks: items,
                            id: value,
                          });
                        }
                      "
                    />
                    <v-edit-dialog
                      v-else
                      :xreturn-value="group"
                      large
                      @save="
                        (value) => {
                          saveCategory({
                            tasks: items,
                            id: value,
                          });
                        }
                      "
                    >
                      {{ group }}
                      <template v-slot:input>
                        <v-text-field
                          :value="group"
                          label="Name"
                          single-line
                          counter
                          clearable
                          xautofocus
                          @change="
                            (value) => {
                              saveCategory({
                                tasks: items,
                                id: value,
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
              xautofocus
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
                  xautofocus
                />
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.category="{ item }">
            <v-text-field
              v-if="
                item.isNew ||
                !item.category ||
                (item.category && item.category.length === 0)
              "
              :value="item.category"
              label="category"
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
              <template v-slot:input>
                <v-text-field
                  v-model="item.category"
                  label="category"
                  single-line
                  counter
                  clearable
                  xautofocus
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
        <v-btn
          bottom
          right
          fixed
          fab
          class="bg-primary"
          @click="create(defaultItem)"
        >
          <v-icon>{{ icons.mdiPlus }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { Sortable } from 'sortablejs';
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

import ListHeader from '@/components/List/ListHeader.vue';

// Sortable.mount(new MultiDrag());

export default {
  components: { ListHeader },
  directives: {
    Ripple,
  },
  async fetch() {
    // const { rows } = await this.$pouch.allDocs({
    //   include_docs: true,
    //   descending: true,
    // });

    // this.items = (rows || []).map((row) => row.doc);

    // const sort = this.groupBy
    //   ? Array.isArray(this.groupBy)
    //     ? this.groupBy
    //     : [this.groupBy]
    //   : Array.isArray(this.sortBy)
    //   ? this.sortBy
    //   : [this.sortBy];

    this.total = (
      await this.$pouch.find({
        selector: {
          name: { $gte: this.search },
          category: { $gte: null },
        },
      })
    ).docs.length;

    const result = await this.$pouch.find({
      selector: {
        name: { $gte: this.search },
        category: { $gte: null },
        type: { $eq: 'task' },
      },
      // sort: ['category', 'name'],
      // limit: this.limit,
      // skip: (this.page - 1) * this.limit,
    });
    const { docs = [] } = result;
    this.items = docs;
    console.log(result);
  },
  fetchOnServer: false,
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
    headers: [
      { value: 'done', align: 'start', width: 1 },
      {
        text: 'Task',
        value: 'name',
        align: 'start',
        groupable: false,
      },
      // { text: 'Due', value: 'due' },
      { text: 'Category', value: 'category', groupable: true },
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
      category: '',
      done: false,
      isNew: false,
    },
    defaultItem: {
      type: 'task',
      name: '',
      category: '',
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
        return this.$route.query.sortBy || 'name';
      },
      set(sortBy) {
        this.$router.push({ query: this.query({ sortBy }) });
      },
    },
    groupBy: {
      get() {
        return this.$route.query.groupBy || 'category';
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
  mounted() {
    this.$pouch
      .changes({
        since: 'now',
        live: true,
      })
      .on('change', this.$fetch);

    // const table = document.querySelector('.v-data-table table tbody');
    // const vm = this;
    // Sortable.create(table, {
    //   filter: '.ignore-elements',
    //   handle: '.handle', // Use handle so user can select text
    //   draggable: '.v-row-group__header',
    //   onEnd({ newIndex, oldIndex }) {
    //     const rowSelected = head(vm.items.splice(oldIndex, 1)); // Get the selected row and remove it
    //     vm.items.splice(newIndex, 0, rowSelected); // Move it to the new index

    //     // const rowSelected = vm.items[oldIndex]; // Get the selected row and remove it
    //     const surround = at(vm.items, newIndex--, newIndex++);
    //     console.log({
    //       rowSelected,
    //       newIndex,
    //       oldIndex,
    //       surround,
    //       items: vm.items,
    //     });
    //   },
    // });
  },
  methods: {
    draggableIgnore: (item) => ({
      'ignore-elements': true,
    }),
    async deleteItem({ _id }) {
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        await this.$pouch.upsert(_id, (doc) => ({
          ...doc,
          _deleted: true,
        }));
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async create(item = this.defaultItem) {
      await this.$pouch.post(item);
    },

    async save(item) {
      await this.$pouch.put(item);
      this.close();
    },

    async saveCategory({ tasks, id }) {
      const category = await this.$pouch.upsert(id, (doc) => ({
        ...doc,
        type: 'category',
      }));

      tasks.forEach(
        async (task) =>
          await this.$pouch.upsert(task._id, (doc) => ({
            ...doc,
            category: category.id,
          })),
      );
    },

    bulkUpdate({ items, key, value }) {
      items.map((item) => (item[key] = value));
    },

    async bulkSave(items) {
      await this.$pouch.bulkDocs(items);
      this.close();
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

  head() {
    return {
      title: 'Tasks',
    };
  },
};
</script>
