<template>
  <div class="container">
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
          <h1>{{ $t('newsletter.heading') }}</h1>
          <div class="indicates-required text-right">
            <span class="asterisk text-danger">*</span>
            {{ $t('newsletter.required') }}
          </div>
          <div class="mc-field-group form-group pb-4">
            <label for="mce-EMAIL">
              {{ $t('newsletter.email.label') }}
              <span class="asterisk text-danger">*</span>
            </label>
            <input
              id="mce-EMAIL"
              type="email"
              name="EMAIL"
              class="form-control required email"
              :placeholder="$t('newsletter.email.placeholder')"
            />
          </div>
          <div class="mc-field-group form-group pb-4">
            <label for="mce-FNAME">{{
              $t('newsletter.firstname.label')
            }}</label>
            <input
              id="mce-FNAME"
              type="text"
              name="FNAME"
              class="form-control"
              :placeholder="$t('newsletter.firstname.placeholder')"
            />
          </div>
          <div class="mc-field-group form-group pb-4">
            <label for="mce-LNAME">{{ $t('newsletter.lastname.label') }}</label>
            <input
              id="mce-LNAME"
              type="text"
              name="LNAME"
              class="form-control"
              :placeholder="$t('newsletter.lastname.placeholder')"
            />
          </div>
          <div id="mce-responses" class="clear">
            <div
              id="mce-error-response"
              class="response"
              style="display:none"
            />
            <div
              id="mce-success-response"
              class="response"
              style="display:none"
            />
          </div>
          <!-- real people should not fill this in and expect good things
        - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input
              type="text"
              name="b_7f69c361c7f5d97725d2e339b_c821016b08"
              tabindex="-1"
              value
            />
          </div>
          <div class="clear">
            <input
              id="mc-embedded-subscribe"
              type="submit"
              :value="$t('newsletter.submit')"
              name="subscribe"
              class="button btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
    <!--End mc_embed_signup-->
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/newsletter',
        },
      ],
    };
  },
  methods: {
    subscribe() {
      this.$ga.event('Newsletter', 'Click', 'Subscribe');
    },
  },
};
</script>

<style>
/* @import url('https://cdn-images.mailchimp.com/embedcode/classic-10_7.css'); */
</style>
