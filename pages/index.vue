<template>
  <div>
    <v-card dark>
      <div
        class="
          position-relative
          overflow-hidden
          pa-3 pa-md-12
          text-center
          bg-dark
          text-light text-shadow
          banner-image-background
        "
        :style="`
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-image: url(${$img(
            '/fl_progressive/ar_16:9,c_fill,f_auto,q_auto,dpr_auto,g_south,w_auto/c_limit,w_1920/v1559982334/hero_rko6us.jpg',
            {},
            { provider: 'cloudinary_upload' },
          )});
        `"
      >
        <div class="product-device shadow-sm d-none d-md-block" />
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        />
        <div class="col-md-5 pa-lg-12 mx-auto my-5">
          <v-avatar width="200" height="176" tile class="mx-auto">
            <v-img
              :src="
                $img(
                  '/v1560038491/logo_vlqvdr.png',
                  {
                    width: 200,
                    height: 176,
                  },
                  { provider: 'cloudinary_upload' },
                )
              "
              alt="Pasta on a sheet of paper"
              width="200"
              height="176"
              center
              contain
            />
          </v-avatar>
          <h1 class="text-centers">PocketPasta</h1>
          <p class="lead font-weight-normal">
            {{ $t('landing.banner.subheading') }}
          </p>
        </div>
        <Credit style="position: absolute; right: 0; bottom: 0" />
      </div>
    </v-card>

    <section>
      <v-container>
        <v-row justify="center" class="my-5">
          <v-col cols="12" align-self="center">
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="text-h5">{{ $t('landing.contact.heading') }}</div>
              </v-card-title>
              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="text-primary">$place</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      $t('landing.contact.location')
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="text-primary">$email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title
                      ><a :href="`mailto:${$t('landing.contact.email')}`">{{
                        $t('landing.contact.email')
                      }}</a></v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import Credit from '@/components/Layout/Credit/landing-hero-image-credit';

import ImageSources from '@/mixins/srcset';

export default {
  components: {
    Credit,
  },
  mixins: [ImageSources],
  layout: 'default',
  async head() {
    return {
      script: [
        {
          json: await this.$content('pocketpasta').fetch(),
          type: 'application/ld+json',
        },
      ],
      link: [],
    };
  },
};
</script>

<style scoped>
/*
 * Dummy devices (replace them with your own or something else entirely!)
 */

.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}

.product-device::before {
  position: absolute;
  top: 10%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: '';
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

.product-device-2 {
  top: -25%;
  right: auto;
  bottom: 0;
  left: 5%;
  /* background-color: #e5e5e5; */
}

.text-shadow {
  text-shadow: #000 0.1em 0.1em 0.2em;
}
</style>
