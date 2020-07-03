<template>
  <div>
    <section>
      <div
        class="position-relative overflow-hidden pa-3 pa-md-12 text-center bg-dark text-light text-shadow banner-image-background"
        :style="`
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-image: url('https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/ar_16:9,c_fill,f_auto,q_auto,dpr_auto,g_south,w_auto/c_limit,w_1920/v1559982334/hero_rko6us.jpg');
        `"
      >
        <div class="product-device shadow-sm d-none d-md-block" />
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        />
        <div class="col-md-5 pa-lg-12 mx-auto my-5">
          <v-avatar width="200" height="176" tile class="mx-auto">
            <v-img
              src="https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_auto/v1560038491/logo_vlqvdr.png"
              srcset="
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_auto/v1560038491/logo_vlqvdr.png 1x,
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_2.0/v1560038491/logo_vlqvdr.png 2x,
                https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_200,h_176,dpr_3.0/v1560038491/logo_vlqvdr.png 3x
              "
              alt="Pasta on a sheet of paper"
              width="200"
              height="176"
              center
              contain
            />
          </v-avatar>
          <h1 class="text-centers">
            PocketPasta
          </h1>
          <p class="lead font-weight-normal">
            {{ $t('landing.banner.subheading') }}
          </p>
        </div>
        <credit style="position: absolute; right: 0; bottom: 0;" />
      </div>
    </section>

    <section>
      <v-container>
        <v-row justify="center" class="my-5">
          <v-col cols="12" align-self="center">
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">{{ $t('landing.contact.heading') }}</div>
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
import linkData from '@/assets/link-data/pocketpasta.json';

export default {
  layout: 'default',
  components: {
    Credit,
  },
  head() {
    return {
      script: [
        {
          json: linkData,
          type: 'application/ld+json',
        },
      ],
      link: [],
    };
  },
};
</script>

<style scoped>
.banner-image-background {
  background-size: cover;
  background-image: url('https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/ar_16:9,c_fill,f_auto,q_auto,dpr_auto,g_south,w_auto/c_limit,w_1920/v1559982334/hero_rko6us.jpg');
}

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
