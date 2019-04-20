<template>
  <div class="container">
    <div class="about">
      <div class="row">
        <div class="col-lg-12 $text-center">
          <h1 class="mt-5">{{ $t('about.heading') }}</h1>
          <p class="lead">
            <!-- PocketPasta is a progressive web app for journaling your life.
        The aim is to have a multi module app that allows users to record how they live.
          Documenting how we live is the first step in planning how to live.-->
            PocketPasta is a collection of my demo apps that I build to practice
            my skills.
          </p>
        </div>
      </div>

      <div class="row">
        <Profile
          class="card bg-light card-body"
          v-bind="this.$store.state.damien"
        />
      </div>

      <div class="row">
        <div class="card bg-light card-body mb-3 profile">
          <h2>What's with the name?</h2>
          <p>
            Our favorite food is pasta so we made a website about pasta. Our
            second favorite thing is memes, so we decied to name our third
            favorite thing after our other favorite things. The name comes form
            4chan
            <a href="https://knowyourmeme.com/memes/spaghetti-stories"
              >Spaghetti Stories</a
            >
            a type of bait-and-switch copypasta posted under the pretext of
            recounting a socially awkward or humiliating situation in
            <a href="https://knowyourmeme.com/memes/greentext-stories"
              >greentext</a
            >. While the plot may vary from one to another, each story ends when
            spaghetti suddenly falls out of one’s pocket or fanny pack, similar
            to the twist in Fresh Prince of Bel-Air copypasta stories.
          </p>
          <div>
            <img
              class="img-fluid mx-auto d-block"
              src="https://i.kym-cdn.com/photos/images/original/001/182/064/60a.jpg"
            />
          </div>
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
