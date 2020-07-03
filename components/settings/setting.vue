<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card flat color="transparent">
          <v-card-title primary-title>
            <v-icon left>${{ icon }}</v-icon>
            <span :id="id" class="title font-weight-light">{{ label }}</span>
          </v-card-title>
          <v-card-text class="subheading form-text text-muted pt-0">{{
            description
          }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="align-self-center">
        <slot :id="id">
          <input type="text" class="form-control" placeholder="placeholder" />
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    label: { type: String, required: true },
    description: { type: String, default: null },
    id: { type: String, default: null },
  },
};
</script>
