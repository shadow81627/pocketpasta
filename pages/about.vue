<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>{{ $t('about.heading') }}</h1>
        <p class="lead">
          <!-- PocketPasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
          PocketPasta is a collection of my demo apps that I build to practice
          my skills.
        </p>
        <vue-plyr>
          <div
            data-plyr-provider="youtube"
            data-plyr-embed-id="W0StMCfs5Ew"
            style="
              padding-top: 56.25%;
              background-image: url('https://i.ytimg.com/vi/W0StMCfs5Ew/maxresdefault.jpg');
            "
          />
        </vue-plyr>
      </b-col>
    </b-row>

    <b-row align-v="center">
      <b-col cols="12" md="6">
        <b-img-lazy
          class="img-fluid mx-auto d-block"
          alt="Typing monkey"
          src="https://res.cloudinary.com/pocketpasta/image/fetch/f_auto,q_auto/https://cdn-images-1.medium.com/max/600/1*6BIIyDspOhlLYW5ZiK6b1Q.jpeg"
          throttle="100"
          width="310"
          height="360"
        />
      </b-col>
      <b-col v-if="damien" cols="12" md="6">
        <h2>{{ damien.name }}</h2>
        <p>
          <strong>Job Title:<span>&nbsp;</span></strong>
          <span>{{ damien.jobTitle }}</span>
        </p>
        <p>
          <strong>About:<span>&nbsp;</span></strong>
          <span>{{ damien.description }}</span>
        </p>
        <keywords
          :tags="damien.keywords ? damien.keywords.split(',') : []"
          label="Skills"
        />
        <div class="py-2 list-inline">
          <div
            class="list-inline-item a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow"
          >
            <a
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
            />
          </div>
        </div>
      </b-col>
    </b-row>

    <!-- <b-row align-v="center">
        <b-col>
          <h3>What's with the name?</h3>
          <p>
            The name comes form 4chan
            <a href="https://knowyourmeme.com/memes/spaghetti-stories"
              >Spaghetti Stories</a
            >
            a type of bait-and-switch copypasta posted under the pretext of
            recounting a socially awkward or humiliating situation in
            <a href="https://knowyourmeme.com/memes/greentext-stories"
              >greentext</a
            >. While the plot may vary from one to another, each story ends when
            spaghetti suddenly falls out of one’s pocket or fanny pack, similar
            to the twist in
            <a href="https://knowyourmeme.com/memes/bel-air-fresh-prince"
              >Fresh Prince of Bel-Air</a
            >
            copypasta stories.
          </p>
        </b-col>
        <b-col>
          <b-img-lazy
            class="img-fluid mx-auto d-block"
            alt="Spaghetti suddenly falls out Pepe"
            src="https://res.cloudinary.com/pocketpasta/image/fetch/https://i.kym-cdn.com/photos/images/original/001/182/064/60a.jpg"
            throttle="100"
          />
        </b-col>
      </b-row> -->
  </b-container>
</template>

<script>
import Keywords from '@/components/Keywords';
import { BRow, BCol, BContainer } from 'bootstrap-vue';

export default {
  components: {
    Keywords,
    BRow,
    BCol,
    BContainer,
  },
  data() {
    return { damien: this.$store.state.damien };
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
