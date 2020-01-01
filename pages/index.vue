<template>
  <div>
    <section>
      <v-parallax
        src="https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_2200/v1559982334/hero_rko6us.jpg"
        height="600"
      >
        <v-row align="center" justify="center" class="white--text">
          <v-col>
            <b-img-lazy
              src="https://res.cloudinary.com/pocketpasta/image/upload/c_fit,f_auto,q_auto,w_200/v1560038491/logo_vlqvdr.png"
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
            <!-- <v-btn class="mt-5" dark large href="/pre-made-themes">
            Get Started
          </v-btn> -->
          </v-col>
          <credit style="position:absolute;right:0;bottom:0;" />
        </v-row>
      </v-parallax>
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
