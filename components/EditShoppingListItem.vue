<template>
  <v-dialog
    :value="dialog"
    persistent
    max-width="400"
    @input="(value) => $emit('dialog', value)"
  >
    <template #activator="{ on, attrs }">
      <slot>
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
          <v-icon>{{ mdiPlus }}</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Shopping</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="item.category"
                :items="categories"
                label="Category"
                name="shopping-category"
                @input="update"
                @keydown.enter="save"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                :value="item.name"
                label="Name"
                name="shopping-name"
                required
                @input="update"
                @keydown.enter="save"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Close</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiPlus } from '@mdi/js';
import { DateTime } from 'luxon';
import cuid from 'cuid';
import { init } from '@/db';
const defaultItem = () => ({
  id: `${cuid()}`,
  name: '',
  category: '',
  due: DateTime.local().toISODate(),
  done: false,
});
export default {
  props: {
    value: { type: Object, default: defaultItem },
    dialog: { type: Boolean, default: false },
  },
  data() {
    return {
      mdiPlus,
      collection: null,
      categories: [],
    };
  },
  computed: {
    item: {
      get() {
        return this.value ?? {};
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  async created() {
    this.$db = await init({
      remote: this.$warehouse.get('dbRemote') || this.$config.DB_REMOTE,
      username: this.$warehouse.get('dbUsername') || this.$config.DB_USERNAME,
      password: this.$warehouse.get('dbPassword') || this.$config.DB_PASSWORD,
    });
    if (this.$db) {
      this.collection = await this.$db.shopping.find({
        selector: {
          name: { $regex: `.*${this.item.category ?? ''}.*` },
        },
      });
      this.sub = await this.collection.$.subscribe((results = []) => {
        this.categories = results.map((item) => item.category);
      });
    }
  },
  beforeDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  },
  methods: {
    update(val) {
      console.log(this.item);
      this.$emit('input', this.item);
    },
    async save() {
      await this.$db.shopping.upsert(this.item);
      this.close();
    },
    close() {
      this.$emit('input', defaultItem());
      this.$emit('dialog', false);
    },
  },
};
</script>
