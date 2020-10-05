<template>
  <v-dialog v-model="dialog" width="600" attach @change="$emit('close', false)">
    <template #activator="{ on, attrs }">
      <slot v-bind="{ on, attrs }" name="activator">
        <v-tooltip bottom>
          <template #activator="tooltip">
            <v-btn
              icon
              title="delete"
              aria-label="delete"
              color="danger"
              v-bind="{ ...tooltip.attrs, ...attrs }"
              v-on="{ ...tooltip.on, ...on, ...$listeners }"
            >
              <v-icon>
                {{ mdiDelete }}
              </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </slot>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2 text-left">
        <span style="word-break: normal"
          >Are you sure you want to {{ action }}?</span
        >
      </v-card-title>
      <v-divider />
      <v-card-actions>
        <v-container>
          <v-row no-gutters justify="end">
            <v-col cols="auto">
              <v-btn large @click="dialog = false">
                <span>No</span>
                <span class="d-none d-sm-inline"
                  >, don't I changed my mind</span
                >
              </v-btn>
            </v-col>
            <v-col cols="auto" class="pl-4">
              <v-btn
                color="error"
                large
                @click="
                  $emit('confirm', true);
                  dialog = false;
                "
              >
                <span>Yes</span>
                <span class="d-none d-sm-inline">, I am sure</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiDelete } from '@mdi/js';
export default {
  props: {
    action: {
      type: String,
      default: 'delete this item',
    },
  },
  data: () => ({ dialog: false, mdiDelete }),
};
</script>
