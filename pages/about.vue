<template>
  <div class="container">
    <div class="about">
      <div class="row">
        <div class="col-12">
          <h1>{{ $t('about.heading') }}</h1>
          <p class="lead">
            <!-- PocketPasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
            PocketPasta is a collection of my demo apps that I build to practice
            my skills.
          </p>
        </div>
      </div>

      <TwoByOne>
        <template #column-1>
          <b-img-lazy
            class="img-fluid mx-auto d-block"
            alt="Typing monkey"
            src="https://cdn-images-1.medium.com/max/600/1*6BIIyDspOhlLYW5ZiK6b1Q.jpeg"
          />
        </template>
        <template #column-2>
          <Profile v-bind="$store.state.damien" />
        </template>
      </TwoByOne>

      <TwoByOne>
        <template #column-1>
          <h2>What's with the name?</h2>
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
        </template>
        <template #column-2>
          <b-img-lazy
            class="img-fluid mx-auto d-block"
            alt="Spaghetti suddenly falls out Pepe"
            src="https://i.kym-cdn.com/photos/images/original/001/182/064/60a.jpg"
          />
        </template>
      </TwoByOne>
      <TwoByOne />

      <!-- <div class="row">
        <div class="card bg-light card-body mb-3 profile">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/SW-BU6keEUw"
              allowfullscreen
            />
          </div>

          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              src="https://www.youtube.com/embed/hKWMrSGO6RQ"
              allowfullscreen
            />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/ProfileSocial.vue';
import TwoByOne from '@/components/TwoByOne';

export default {
  components: {
    Profile,
    TwoByOne,
  },
  data() {
    return { damien: this.$store.state.damien };
  },
  head() {
    return {
      script: [
        {
          innerHTML: JSON.stringify(this.damien),
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://pocketpasta.com/about',
        },
      ],
    };
  },
};
</script>
