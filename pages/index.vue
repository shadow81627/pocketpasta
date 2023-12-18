<template>
  <div>
    <v-card theme="dark">
      <div
        class="position-relative overflow-hidden pa-3 pa-md-12 text-center bg-dark text-light text-shadow banner-image-background"
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
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        ></div>
        <div class="col-md-5 pa-lg-12 mx-auto my-5">
          <div
            width="200"
            height="176"
            tile
            class="mx-auto"
            style="width: 200px"
          >
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
          </div>
          <h1 class="text-centers">PocketPasta</h1>
          <p class="lead font-weight-normal">
            {{ "landing.banner.subheading" }}
          </p>
        </div>
        <UnsplashCredit style="position: absolute; right: 0; bottom: 0" />
      </div>
    </v-card>

    <section>
      <v-container>
        <v-row justify="center" class="my-5">
          <v-col cols="12" align-self="center">
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="text-h5">Contact Us</div>
              </v-card-title>
              <BaseLinks :items="contactDetails"></BaseLinks>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const $img = useImage();
// return { $img };
const contactDetails = [
  {
    icon: "carbon:email",
    subtitle: "Email",
    title: "contact@pocketpasta.com",
    href: "mailto:contact@pocketpasta.com",
  },
  {
    type: "location",
    icon: "carbon:location",
    subtitle: "Location",
    title: "New Farm, Australia",
    href: "https://www.google.com.au/maps/search/?api=1&query=Daim%20Digital%201%2F888%20Brunswick%20Street%20New%20Farm%20Queensland%204005%20Australia",
    location: {
      streetAddress: "Salt Space 1/888 Brunswick Street",
      city: "New Farm",
      countryCode: "AU",
      country: "Australia",
      postalCode: "4005",
      region: "Queensland",
    },
  },
];
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
  content: "";
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
