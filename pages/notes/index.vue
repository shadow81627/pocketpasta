<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Notes</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <client-only>
          <!-- <editor v-model="content" :loading="$fetchState.pending" /> -->
          <tiptap-vuetify
            v-model="content"
            :extensions="extensions"
            placeholder="Write something …"
            :card-props="{ loading: $fetchState.pending }"
          >
            <template v-slot:footer>
              <v-divider />
              <v-container fluid>
                <v-row no-gutters>
                  <v-spacer />
                  <v-col cols="auto">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          aria-label="delete"
                          color="error"
                          v-on="on"
                          @click="deleteItem()"
                        >
                          <v-icon>
                            {{ mdiDelete }}
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </tiptap-vuetify>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { head, debounce } from 'lodash-es';
// import Editor from '@/components/Editor/Editor';
import {
  TiptapVuetify,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Image,
  Paragraph,
  Heading,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  TodoList,
  TodoItem,
  History,
} from 'tiptap-vuetify';
import { mdiDelete } from '@mdi/js';

export default {
  components: {
    TiptapVuetify,
  },
  fetchOnServer: false,
  async fetch() {
    const result = await this.$pouch.find({
      selector: {
        type: { $eq: 'note' },
      },
    });
    const { docs = [] } = result;
    this.items = docs;
  },
  data: () => ({
    items: [],
    loading: false,
    mdiDelete,
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      TodoList,
      TodoItem,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      CodeBlock,
      Image,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
  computed: {
    content: {
      get() {
        const { content } = head(this.items) ?? {};
        return content;
      },
      async set(value) {
        const item = {
          _id: `notes/${1}`,
          ...(head(this.items) ?? {}),
          type: 'note',
          content: value,
        };
        await this.debouncedSave(item);
      },
    },
  },
  created() {
    // only save 2 seconds after typing stops to prevent lots of revisions being created
    this.debouncedSave = debounce(this.save, 2000);
  },
  mounted() {
    this.$pouch
      .changes({
        since: 'now',
        live: true,
      })
      .on('change', this.$fetch);
  },
  methods: {
    async deleteItem({ _id } = head(this.items)) {
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        await this.$pouch.upsert(_id, (doc) => ({
          ...doc,
          _deleted: true,
        }));
      }
    },
    async save(item) {
      this.loading = true;
      await this.$pouch.upsert(item._id, (doc) => ({
        ...doc,
        ...item,
        updatedAt: new Date(),
      }));
      this.loading = false;
    },
  },
  head() {
    return {
      title: 'Notes',
    };
  },
};
</script>
