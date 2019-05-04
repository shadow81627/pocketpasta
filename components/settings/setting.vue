<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-md-6">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>{{ icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <label>{{ label }}</label>
            </v-list-tile-title>
            <span class="form-text text-muted">
              {{ description }}
            </span>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <div class="col-md-6 align-self-center">
        <slot>
          <input type="text" class="form-control" placeholder="placeholder" />
        </slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    label: { type: String, required: true },
    description: { type: String, default: null },
  },
};
</script>
