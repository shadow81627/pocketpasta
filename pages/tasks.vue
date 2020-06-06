<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Tasks</h1>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :sort-by="['isNew', 'xdone', 'xdue']"
          :sort-desc="['isNew']"
          multi-sort
          class="elevation-1"
          :group-by.sync="groupBy"
          item-key="id"
          mobile-breakpoint="0"
          :loading="$fetchState.pending"
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
              <!-- <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <b-button variant="primary" v-on="on" @click="create"
                    >New Item</b-button
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            v-model="newDueMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.due"
                                label="Due"
                                :prepend-icon="icons.mdiCalendar"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.due"
                              @input="newDueMenu = false"
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BCol, BRow, BContainer } from 'bootstrap-vue';
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
  // middleware: ['auth'],
  components: {
    BCol,
    BRow,
    BContainer,
    // BButton,
  },
  directives: {
    Ripple,
  },
  async fetch() {
    const { docs } = await this.$fireStore.collection(this.collection).get();
    this.items = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },
  fetchOnServer: false,
  data: () => ({
    DateTime,
    groupBy: null,
    newDueMenu: false,
    search: '',
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
      name: '',
      due: DateTime.local().toISODate(),
      done: false,
      isNew: false,
    },
    defaultItem: {
      name: '',
      due: DateTime.local().toISODate(),
      done: false,
      isNew: true,
    },
  }),

  computed: {
    // formTitle() {
    //   return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    // },
    collection() {
      return `users/${this.$auth.user.uid}/tasks`;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    // editItem(item) {
    //   this.editedIndex = this.items.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    async deleteItem(item) {
      const index = this.items.indexOf(item);
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        this.items.splice(index, 1);
        await this.$fireStore.collection(this.collection).doc(item.id).delete();
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
      const response = await this.$fireStore
        .collection(this.collection)
        .add(this.defaultItem);
      const task = { ...this.defaultItem, id: response.id };
      this.items.push(task);
    },

    async save(item) {
      await this.$fireStore.collection(this.collection).doc(item.id).set(item);
      this.close();
    },
  },

  head() {
    return {
      title: 'Tasks',
    };
  },
};
</script>
