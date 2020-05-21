<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Tasks</h1>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          sort-by="due"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item.done="{ item }">
            <v-simple-checkbox v-model="item.done" />
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              >
                <v-icon slot="append">{{ icons.mdiMagnify }}</v-icon>
              </v-text-field>
              <v-spacer />
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <b-button variant="primary" v-on="on">New Item</b-button>
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
                          <v-text-field v-model="editedItem.due" label="Due" />
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
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.name="props">
            <v-edit-dialog :return-value.sync="props.item.name">
              {{ props.item.name }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.name"
                  :rules="[(v) => v.length <= 25 || 'Input too long!']"
                  label="Name"
                  single-line
                  counter
                />
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.due="props">
            <v-edit-dialog :return-value.sync="props.item.due" large>
              <!-- {{ DateTime.fromISO(props.item.due).toRelativeCalendar() }} -->
              {{
                DateTime.fromISO(props.item.due).toLocaleString(
                  DateTime.DATE_FULL,
                )
              }}
              <template v-slot:input>
                <v-date-picker v-model="props.item.due" no-title scrollable />
                <!-- <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  :return-value.sync="props.item.due"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="
                        DateTime.fromISO(props.item.due).toLocaleString(
                          DateTime.DATE_FULL,
                        )
                      "
                      label="Picker in menu"
                      :prepend-icon="icons.mdiCalendar"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="props.item.due"
                    :xvalue="props.item.due"
                    no-title
                    scrollable
                    change="test"
                  >
                    <v-spacer />
                    <v-btn text color="primary" click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(props.item.due)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu> -->
              </template>
            </v-edit-dialog>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn icon title="edit" @click="editItem(item)">
              <v-icon>
                {{ icons.mdiPencil }}
              </v-icon>
            </v-btn>
            <v-btn icon title="delete" @click="deleteItem(item)">
              <v-icon>
                {{ icons.mdiDelete }}
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BCol, BRow, BContainer, BButton } from 'bootstrap-vue';
import { VDataTable } from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import { mdiPencil, mdiDelete, mdiMagnify, mdiCalendar } from '@mdi/js';
import { DateTime } from 'luxon';

export default {
  middleware: ['auth'],
  components: {
    BCol,
    BRow,
    BContainer,
    VDataTable,
    BButton,
  },
  directives: {
    Ripple,
  },
  data: () => ({
    DateTime,
    search: '',
    icons: { mdiPencil, mdiDelete, mdiMagnify, mdiCalendar },
    dialog: false,
    headers: [
      { value: 'done', align: 'start', width: 1 },
      {
        text: 'Task',
        value: 'name',
        align: 'start',
      },
      { text: 'Due', value: 'due' },
      {
        value: 'actions',
        sortable: false,
        filterable: false,
        align: 'right',
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      due: DateTime.local(),
      done: false,
    },
    defaultItem: {
      name: '',
      due: DateTime.local(),
      done: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    test(value) {
      console.log(value);
    },
    initialize() {
      this.desserts = [
        {
          name: 'Take out trash',
          done: true,
          due: DateTime.local().plus({ days: 7 }).toISODate(),
        },
        {
          name: 'Washup',
          done: false,
          due: DateTime.local().minus({ days: 7 }).toISODate(),
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          done: false,
          due: DateTime.local().plus({ days: 7 }).toISODate(),
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          done: false,
          due: DateTime.local().plus({ days: 3 }).toISODate(),
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          done: false,
          due: DateTime.local().minus({ days: 3 }).toISODate(),
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          done: true,
          due: DateTime.local().toISODate(),
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          done: false,
          due: DateTime.local().toISODate(),
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          done: false,
          due: DateTime.local().toISODate(),
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          done: false,
          due: DateTime.local().toISODate(),
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          done: false,
          due: DateTime.local().toISODate(),
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
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
