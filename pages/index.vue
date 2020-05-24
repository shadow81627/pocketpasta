<template>
  <div>
    <section>
      <div
        class="position-relative overflow-hidden p-3 p-md-5 xm-md-3 text-center bg-dark text-light text-shadow banner-image-background"
        style="
          background-size: cover;
          background-image: url('https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/ar_16:9,c_fill,f_auto,q_auto,dpr_auto,g_south,w_auto/c_limit,w_1920/v1559982334/hero_rko6us.jpg');
        "
      >
        <div class="product-device shadow-sm d-none d-md-block" />
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        />
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <b-img
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
          />
          <h1 class="text-centers">
            PocketPasta
          </h1>
          <p class="lead font-weight-normal">
            {{ $t('landing.banner.subheading') }}
          </p>
          <!-- <a class="btn btn-outline-secondary" href="#">Coming soon</a> -->
        </div>
        <credit style="position: absolute; right: 0; bottom: 0;" />
      </div>
      <!-- <v-parallax
        src="https://res.cloudinary.com/pocketpasta/image/upload/fl_progressive/c_fit,f_auto,q_auto,w_auto,dpr_auto/c_limit,w_2200/v1559982334/hero_rko6us.jpg"
        height="600"
      >
        <v-row align="center" justify="center" class="white--text">
          <v-col>
            <b-img-lazy
              src="https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_auto,dpr_auto/c_limit,w_200/v1560038491/logo_vlqvdr.png"
              srcset="
                https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_200,dpr_auto/c_limit,w_200/v1560038491/logo_vlqvdr.png 1x,
                https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_200,dpr_2.0/c_limit,w_200/v1560038491/logo_vlqvdr.png 2x,
                https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_200,dpr_3.0/c_limit,w_200/v1560038491/logo_vlqvdr.png 3x
              "
              alt="Pasta on a sheet of paper"
              width="200"
              center
              throttle="100"
            />
            <h1 class="brand white--text mb-2 text-center">
              PocketPasta
            </h1>
            <div class="subheading mb-3 text-center">
              {{ $t('landing.banner.subheading') }}
            </div>
          </v-col>
          <credit style="position: absolute; right: 0; bottom: 0;" />
        </v-row>
      </v-parallax> -->
    </section>

    <!-- <section>
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12 sm4 class="my-3">
          <div class="text-center">
            <h2 class="headline">The best way to start developing</h2>
            <span class="subheading">
              Cras facilisis mi vitae nunc
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >color_lens</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">
                      Material Design
                    </div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                    volutpat tincidunt ornare. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus
                    bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >flash_on</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Fast development</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                    volutpat tincidunt ornare. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus
                    bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2"
                      >build</v-icon
                    >
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">
                      Completely Open Sourced
                    </div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla
                    volutpat tincidunt ornare. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus
                    bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section> -->

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
