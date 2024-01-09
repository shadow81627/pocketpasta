<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Subscribe to our mailing list</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- Begin MailChimp Signup Form -->
        <div id="mc_embed_signup">
          <form
            id="mc-embedded-subscribe-form"
            action="https://pocketpasta.us16.list-manage.com/subscribe/post?u=7f69c361c7f5d97725d2e339b&amp;id=c821016b08"
            method="post"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div id="mc_embed_signup_scroll">
              <div class="indicates-required text-right">
                <span class="asterisk text-danger">*</span>
                indicates required
              </div>
              <div class="mc-field-group form-group pb-4">
                <label for="mce-EMAIL">
                  Email Address
                  <span class="asterisk text-danger">*</span>
                </label>
                <v-text-field
                  id="mce-EMAIL"
                  type="email"
                  name="EMAIL"
                  class="form-control required email"
                  placeholder="john.smith@example.com"
                />
              </div>
              <div class="mc-field-group form-group pb-4">
                <label for="mce-FNAME">First Name</label>
                <v-text-field
                  id="mce-FNAME"
                  type="text"
                  name="FNAME"
                  class="form-control"
                  placeholder="John"
                />
              </div>
              <div class="mc-field-group form-group pb-4">
                <label for="mce-LNAME">Last Name</label>
                <v-text-field
                  id="mce-LNAME"
                  type="text"
                  name="LNAME"
                  class="form-control"
                  placeholder="Smith"
                />
              </div>
              <div id="mce-responses" class="clear">
                <div
                  id="mce-error-response"
                  class="response"
                  style="display: none"
                />
                <div
                  id="mce-success-response"
                  class="response"
                  style="display: none"
                />
              </div>
              <!-- real people should not fill this in and expect good things
        - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px" aria-hidden="true">
                <input
                  type="text"
                  name="b_7f69c361c7f5d97725d2e339b_c821016b08"
                  tabindex="-1"
                  value
                />
              </div>
              <div class="clear">
                <v-btn
                  id="mc-embedded-subscribe"
                  type="submit"
                  name="subscribe"
                  class="button"
                  color="primary"
                  >Subscribe</v-btn
                >
              </div>
            </div>
          </form>
        </div>
        <!--End mc_embed_signup-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      link: [],
    };
  },
  methods: {
    subscribe() {
      // this.$ga.event("Newsletter", "Click", "Subscribe");
    },
  },
};
</script>

<style>
/* @import url('https://cdn-images.mailchimp.com/embedcode/classic-10_7.css'); */
</style>
