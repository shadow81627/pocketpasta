<template>
  <div>
    <span>View as: </span>
    <v-menu left offset-y>
      <template v-slot:activator="{ on }" aria-label="View as">
        <v-btn icon v-on="on">
          <v-icon>${{ currentLayout.icon }}</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dense>
          <v-list-item
            v-for="layout in availableLayouts"
            :key="layout.value"
            @click="() => $emit('input', layout.value)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ layout.label }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>${{ layout.icon }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
const defaultLayout = 'list';

export default {
  props: {
    value: { type: String, default: 'list' },
    layouts: {
      type: Array,
      default: () => [
        { icon: 'list', value: 'list', label: 'List' },
        { icon: 'view_comfy', value: 'columns', label: 'Grid' },
      ],
    },
  },
  computed: {
    currentLayout() {
      const vm = this;
      return vm.layouts.find((layout) => {
        return (vm.value || defaultLayout) === layout.value;
      });
    },
    availableLayouts() {
      const vm = this;
      return vm.layouts.filter(
        (layout) => (vm.value || defaultLayout) !== layout.value,
      );
    },
    inputListeners() {
      // Allow other events to be bound
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event);
        },
      });
    },
  },
};
</script>
