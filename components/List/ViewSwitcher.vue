<template>
  <div>
    <span>View as:</span>
    <v-menu left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>list</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dense>
          <v-list-tile @click="() => {}">
            <v-list-tile-content>
              <v-list-tile-title>Grid</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>view_comfy</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: null },
  },
};
</script>
