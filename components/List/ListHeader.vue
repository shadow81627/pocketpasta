<template>
  <v-card dark :color="$vuetify.theme.dark ? '' : 'primary'" class="mb-1">
    <v-expansion-panels v-model="expanded" readonly>
      <v-expansion-panel>
        <v-expansion-panel-header
          :color="$vuetify.theme.dark ? '' : 'primary'"
          disable-icon-rotate
          style="min-height: 80px;"
          aria-label="tune"
        >
          <client-only>
            <v-text-field
              :value="search"
              clearable
              flat
              solo-inverted
              single-line
              hide-details
              :prepend-inner-icon="mdiMagnify"
              label="Search"
              autocomplete="false"
              @keydown.enter="$event.target.blur()"
              @input="$emit('update:search', $event)"
            />
          </client-only>
          <template v-slot:actions>
            <client-only>
              <v-icon
                class="ml-4"
                aria-label="tune"
                @click="expanded = expanded === 0 ? null : 0"
                >{{ mdiTune }}</v-icon
              >
            </client-only>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          :color="$vuetify.theme.dark ? '' : 'primary'"
        >
          <v-container class="pa-0">
            <v-row>
              <v-col cols="auto">
                <v-container fluid class="pa-0">
                  <v-row no-gutters>
                    <v-col>
                      <v-select
                        v-if="sortable.length"
                        :value="sortBy"
                        flat
                        solo-inverted
                        hide-details
                        :items="sortable"
                        :prepend-inner-icon="mdiSortVariant"
                        label="Sort by"
                        aria-label="Sort by"
                        @input="$emit('update:sortBy', $event)"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-btn-toggle
                        :value="direction"
                        mandatory
                        tile
                        @change="$emit('update:direction', $event)"
                      >
                        <v-btn
                          depressed
                          :color="$vuetify.theme.dark ? '' : 'primary'"
                          value="asc"
                          aria-label="sort ascending"
                        >
                          <v-icon>{{ mdiSortAlphabeticalAscending }}</v-icon>
                        </v-btn>
                        <v-btn
                          depressed
                          :color="$vuetify.theme.dark ? '' : 'primary'"
                          value="desc"
                          aria-label="sort descending"
                        >
                          <v-icon>{{ mdiSortAlphabeticalDescending }}</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col v-if="groupable.length" cols="auto">
                <v-select
                  :value="groupBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="groupable"
                  :prepend-inner-icon="mdiSelectGroup"
                  label="Group by"
                  aria-label="Group by"
                  @input="$emit('update:groupBy', $event)"
                />
              </v-col>
              <v-col cols="auto" style="min-width: 202px;">
                <v-menu offset-y close-on-click>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn large text v-bind="attrs" v-on="on">
                      {{ limit }}
                      <span> per page</span>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in limits"
                      :key="index"
                      @click="$emit('update:limit', number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <view-switcher
                  :value="view"
                  @input="$emit('update:view', $event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import {
  mdiSortAlphabeticalAscending,
  mdiSortAlphabeticalDescending,
  mdiSortVariant,
  mdiMagnify,
  mdiSelectGroup,
  mdiTune,
} from '@mdi/js';
import ViewSwitcher from '@/components/List/ViewSwitcher.vue';

export default {
  components: { ViewSwitcher },
  props: {
    headers: { type: Array },
    search: { type: String },
    sortBy: { type: String },
    direction: { type: String },
    groupBy: { type: String },
    limit: { type: Number },
    limits: { type: Array, default: () => [12, 24, 48] },
    view: { type: String },
  },
  data: () => ({
    mdiSortAlphabeticalAscending,
    mdiSortAlphabeticalDescending,
    mdiSortVariant,
    mdiMagnify,
    mdiSelectGroup,
    mdiTune,
    expanded: null,
  }),
  computed: {
    groupable() {
      return this.headers && Array.isArray(this.headers)
        ? this.headers.filter((header) => header.groupable && header.text)
        : [];
    },
    sortable() {
      return this.headers && Array.isArray(this.headers)
        ? this.headers.filter(
            (header) => (header.sortable ?? true) && header.text,
          )
        : [];
    },
  },
};
</script>
