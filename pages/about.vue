<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>About</h1>
        <p class="lead">
          <!-- PocketPasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
          PocketPasta is a collection of my demo apps that I build to practice
          my skills.
        </p>
        <div class="prose mx-auto">
          <Youtube video-id="W0StMCfs5Ew"></Youtube>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <h2 class="display-2">Team</h2>
        <div
          class="base-body text-body-1 grey--text text--darken-1 text-center"
        >
          Meet the wonderful people that help to bring this site to life.
        </div>
      </v-col>
    </v-row>
    <v-row class="align-v">
      <v-col cols="12" md="6">
        <v-img
          class="img-fluid mx-auto d-block"
          alt="Typing monkey"
          src="https://res.cloudinary.com/pocketpasta/image/fetch/f_auto,q_auto/https://cdn-images-1.medium.com/max/600/1*6BIIyDspOhlLYW5ZiK6b1Q.jpeg"
          throttle="100"
          width="310"
          height="360"
        />
      </v-col>
      <v-col v-if="damien" cols="12" md="6">
        <div class="prose">
          <h3>{{ damien.name }}</h3>
          <p>
            <strong>Job Title:<span>&nbsp;</span></strong>
            <span>{{ damien.jobTitle }}</span>
          </p>
          <p>
            <strong>About:<span>&nbsp;</span></strong>
            <span>{{ damien.description }}</span>
          </p>
          <strong class="tag pl-0 font-weight-bold">Skills</strong>
          <Keywords
            :tags="damien.keywords ? damien.keywords.split(',') : []"
            label=""
          />
          <div class="py-2 list-inline">
            <div
              class="list-inline-item a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow"
            >
              <!-- <a
              class="a2a_button_twitter"
              data-a2a-follow="Shadow81627"
              rel="noopener"
            />
            <a
              class="a2a_button_facebook"
              data-a2a-follow="damien.robinson.5036"
              rel="noopener"
            />
            <a
              class="a2a_button_linkedin"
              data-a2a-follow="damien-robinson-788925101"
              rel="noopener"
            />
            <a
              class="a2a_button_youtube"
              data-a2a-follow="shadow81627"
              rel="noopener"
            />
            <a
              class="a2a_button_github"
              data-a2a-follow="shadow81627"
              rel="noopener"
            /> -->
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      damien: {
        '@context': 'http://schema.org',
        '@type': 'Person',
        description:
          'Damien is a Web Developer with 5+ years of experience. He specialises in handcrafted, bespoke websites, with an interest in open source, marketing and ecommerce. Reach out about your fresh new digital presence today.',
        keywords: 'HTML, CSS, Vue, Bootstrap',
        email: 'mailto:damien.robinson@pocketpasta.com',
        jobTitle: 'Full Stack Web Developer',
        brand: 'PocketPasta',
        name: 'Damien Robinson',
        givenName: 'Damien',
        familyName: 'Robinson',
        alumniOf: 'Griffith University',
        gender: 'male',
        nationality: 'Australian',
        url: 'https://pocketpasta.com',
        sameAs: [
          'https://github.com/shadow81627',
          'https://www.linkedin.com/in/damien-robinson-788925101/',
          'https://twitter.com/Shadow81627',
        ],
      },
    };
  },
  head() {
    return {
      script: [
        {
          json: this.damien,
          type: 'application/ld+json',
        },
        {
          async: '',
          src: 'https://static.addtoany.com/menu/page.js',
        },
      ],
    };
  },
};
</script>
