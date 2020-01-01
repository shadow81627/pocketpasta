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

      <two-by-one>
        <template #column-1>
          <b-img-lazy
            class="img-fluid mx-auto d-block"
            alt="Typing monkey"
            src="https://cdn-images-1.medium.com/max/600/1*6BIIyDspOhlLYW5ZiK6b1Q.jpeg"
            throttle="100"
          />
        </template>
        <template #column-2>
          <profile v-bind="$store.state.damien" />
        </template>
      </two-by-one>

      <two-by-one>
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
            throttle="100"
          />
        </template>
      </two-by-one>
      <two-by-one />

      <v-lazy
        :options="{
          threshold: 0.5,
        }"
        min-height="315"
        transition="fade-transition"
      >
        <div class="row">
          <div class="col">
            <h2>The Pitch</h2>
            <div class="embed-responsive embed-responsive-16by9 d-print-none">
              <iframe
                width="560"
                height="315"
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/W0StMCfs5Ew"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </v-lazy>

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
          json: this.damien,
          type: 'application/ld+json',
        },
      ],
      link: [],
    };
  },
};
</script>
