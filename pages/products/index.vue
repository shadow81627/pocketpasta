<template>
  <v-container>
    <v-row>
      <v-col
        v-for="{ slug, name, description } in items"
        :key="slug"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex flex-column"
      >
        <v-card
          :to="{ path: `/products/${slug}` }"
          exact
          nuxt
          ripple
          hover
          elevation="4"
          class="flex d-flex flex-column"
        >
          <v-avatar color="grey" height="256" width="auto" tile> </v-avatar>
          <v-container>
            <v-row class="align-center justify-center" no-gutters>
              <v-col cols="12" sm="" style="min-width: 224px">
                <v-card-title title-tag="h2" class="h4 text-break text-wrap">
                  {{ name }}
                </v-card-title>
                <v-card-subtitle class="text-wrap text-subtitle-1">{{
                  description
                }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ky from 'ky-universal';
import { Orbit } from '@orbit/core';
import { remote } from '@/db/orbit';
export default {
  data: () => ({ items: [] }),
  async fetch() {
    const { 'XSRF-TOKEN': XSRF, pocketpasta_session: token } =
      this.$auth.$storage.getCookies();
    const cookie = this.$auth.$storage.getCookies();
    const origin = this.$config.API_URL;
    Orbit.fetch = async function (url, ...args) {
      const { headers } = args;
      const fetchFn = await ky(url, {
        ...args,
        headers: {
          ...headers,
          'XSRF-TOKEN': XSRF,
          pocketpasta_session: token,
          cookie: Object.entries(cookie)
            .map(([k, v]) => `${k}=${v}`)
            .join('; '),

          referer: origin,
          origin,
          accept: 'application/vnd.api+json',
        },
        credentials: 'include',
        mode: 'cors',
      });
      return fetchFn;
    };
    const items = await remote.query((q) => q.findRecords('product'));
    this.items = items.map(({ attributes, id }) => ({ id, ...attributes }));
  },
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find the best place to buy pasta ingredients.',
        },
      ],
    };
  },
};
</script>
