<template>
  <div class="container">
    <div class="about">
      <div class="row">
        <div class="col-lg-12 $text-center">
          <h1 class="mt-5">About Pocket Pasta</h1>
          <p class="lead">
            <!-- Pocket Pasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
            PocketPasta is a collection of my demo apps that I build to practice
            my skills.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="card bg-light card-body mb-3 profile">
          <h2>We are all about the spathetti here</h2>
          <p>
            We eat
            <a href="https://knowyourmeme.com/memes/spaghetti-stories"
              >spagetti</a
            >
            to forgetti the regretti
          </p>
          <!-- <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item"
            src="https://www.youtube.com/embed/SW-BU6keEUw"
            allowfullscreen
          />
        </div> -->
          <!-- <b-carousel
          id="carousel-fade"
          fade
          indicators
          controls
          no-animation
          :interval="0"
          img-width="1024"
          img-height="440"
        >
          <b-carousel-slide img-blank img-alt="Blank image"
            ><div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/SW-BU6keEUw"
                allowfullscreen
              /></div
          ></b-carousel-slide>
          <b-carousel-slide img-blank img-alt="Blank image"
            ><div class="embed-responsive embed-responsive-16by9">
              <iframe
                class="embed-responsive-item"
                src="https://www.youtube.com/embed/hKWMrSGO6RQ"
                allowfullscreen
              /></div
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="https://i.kym-cdn.com/photos/images/original/001/182/064/60a.jpg"
          />
        </b-carousel> -->
        </div>
      </div>
      <div class="row">
        <Profile v-bind="this.$store.state.damien" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/ProfileSocial.vue';

export default {
  components: {
    Profile,
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
