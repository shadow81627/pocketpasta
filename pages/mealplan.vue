<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Meal Plan</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-toolbar flat>
          <v-menu
            ref="startMenu"
            v-model="startMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="start"
            transition="scale-transition"
            min-width="290px"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start"
                class="mt-3"
                label="Start Date"
                :prepend-icon="mdiCalendar"
                dense
                readonly
                outlined
                hide-details
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="start" no-title scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="startMenu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.startMenu.save(start)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer />
          <v-btn fab small color="primary" @click="$refs.calendar.prev()">
            <v-icon>$prev</v-icon>
          </v-btn>
          <v-btn fab small color="primary" @click="$refs.calendar.next()">
            <v-icon>$next</v-icon>
          </v-btn>
        </v-toolbar>
        <client-only>
          <v-sheet>
            <v-calendar
              ref="calendar"
              v-model="start"
              :now="today"
              :events="events"
              xcolor="primary"
              type="month"
              min-weeks="2"
              event-height="auto"
            >
              <template v-slot:event="{ event }">
                <card v-bind="{ ...event, type: 'Recipe' }" />
              </template>
            </v-calendar>
          </v-sheet>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCalendar } from '@mdi/js';
import { DateTime } from 'luxon';

import Card from '@/components/List/Card';
export default {
  components: {
    Card,
  },
  async fetch() {
    const content = await this.$content('recipes', {})
      .only(['id', 'slug', 'name', 'description', 'image', '@type'])
      .where({ '@type': 'Recipe' })
      .fetch();
    const now = DateTime.fromISO(this.start);
    const results = content.map((item, index) => ({
      ...item,
      start: now.plus({ days: index }).toISODate(),
    }));
    this.events = results;
  },
  data: () => ({
    mdiCalendar,
    startMenu: false,
    start: DateTime.local().startOf('week').toISODate(),
    today: DateTime.local().toISODate(),
    events: [
      {
        name: 'Mash Potatoes',
        start: DateTime.local().toISODate(),
      },
    ],
  }),
  fetchOnServer() {
    return true;
  },
};
</script>

<style>
.v-calendar-weekly__day.v-calendar-weekly__day {
  min-width: 224px;
}
</style>
