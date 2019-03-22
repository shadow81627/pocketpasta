<template>
  <div class="col-lg-12">
    <div class="card bg-light card-body mb-3 profile">
      <div class="col-md-12">
        <div class="$col-md-6">
          <h2>{{ name }}</h2>
          <KeyValue label="Job Title" :value="jobTitle" />
          <KeyValue label="About" :value="description" />
          <p>
            <!-- <strong>Hobbies:</strong> -->
            <!-- Read, out with friends, listen to music,
            draw and learn new things.-->
          </p>
          <Keywords
            :tags="keywords ? keywords.split(',') : []"
            label="Skills"
          />
          <p v-for="link in sameAs" :key="link">
            <a :href="link">{{ link }}</a>
          </p>
        </div>
        <!-- <div class="col-12 text-center">
          <figure>
            <img
              src="http://www.localcrimenews.com/wp-content/uploads/2013/07/default-user-icon-profile.png"
              alt
              class="rounded-circle img-fluid"
            />
            <figcaption class="ratings">
              <p>
                Ratings
                <a href="#">
                  <span class="fa fa-star" />
                </a>
                <a href="#">
                  <span class="fa fa-star" />
                </a>
                <a href="#">
                  <span class="fa fa-star" />
                </a>
                <a href="#">
                  <span class="fa fa-star" />
                </a>
                <a href="#">
                  <span class="fa fa-star-o" />
                </a>
              </p>
            </figcaption>
          </figure>
        </div>-->
      </div>
      <!-- <div class="col-12 divider text-center">
        <div class="col-12 emphasis">
          <h2>
            <strong>20,7K</strong>
          </h2>
          <p>
            <small>Followers</small>
          </p>
          <button class="btn btn-success btn-block">
            <span class="fa fa-plus-circle">Follow</span>
          </button>
        </div>
        <div class="col-12 emphasis">
          <h2>
            <strong>245</strong>
          </h2>
          <p>
            <small>Following</small>
          </p>
          <button class="btn btn-info btn-block">
            <span class="fa fa-user">View Profile</span>
          </button>
        </div>
        <div class="col-12 emphasis">
          <h2>
            <strong>43</strong>
          </h2>
          <p>
            <small>Snippets</small>
          </p>
          <div class="btn-group dropup btn-block">
            <button type="button" class="btn btn-primary">
              <span class="fa fa-gear">Options</span>
            </button>
            <button
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
            >
              <span class="caret">
                <span class="sr-only">Toggle Dropdown</span>
              </span>
            </button>
            <ul class="dropdown-menu text-left" role="menu">
              <li class="dropdown-item">
                <a href="#">
                  <span class="fa fa-envelope float-right">Send an email</span>
                </a>
              </li>
              <li class="dropdown-item">
                <a href="#">
                  <span class="fa fa-list float-right">
                    Add or remove from a list
                  </span>
                </a>
              </li>
              <li class="divider dropdown-item" />
              <li class="dropdown-item">
                <a href="#">
                  <span class="fa fa-warning float-right">
                    Report this user for spam
                  </span>
                </a>
              </li>
              <li class="divider dropdown-item" />
              <li class="dropdown-item">
                <a href="#" class="btn disabled" role="button">Unfollow</a>
              </li>
            </ul>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Keywords from '@/components/Keywords.vue';
import KeyValue from '@/components/KeyValue.vue';

export default {
  components: {
    Keywords,
    KeyValue,
  },
  inheritAttrs: false,
  props: {
    name: { type: String },
    description: { type: String },
    keywords: { type: String },
    email: String,
    jobTitle: String,
    sameAs: Array,
  },
};
</script>

<style>
/* @import url(http://fonts.googleapis.com/css?family=Lato:400,700); */
/* body {
  font-family: 'Lato', 'sans-serif';
} */
.profile {
  /* min-height: 355px; */
  display: inline-block;
}
figcaption.ratings {
  margin-top: 20px;
}
figcaption.ratings a {
  color: #f1c40f;
  font-size: 11px;
}
figcaption.ratings a:hover {
  color: #f39c12;
  text-decoration: none;
}
.divider {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.emphasis {
  border-top: 4px solid transparent;
}
.emphasis:hover {
  border-top: 4px solid #1abc9c;
}
.emphasis h2 {
  margin-bottom: 0;
}
.dropdown-menu {
  background-color: #34495e;
  box-shadow: none;
  -webkit-box-shadow: none;
  width: 250px;
  margin-left: -125px;
  left: 50%;
}
.dropdown-menu .divider {
  background: none;
}
.dropdown-menu > li > a {
  color: #f5f5f5;
}
.dropup .dropdown-menu {
  margin-bottom: 10px;
}
.dropup .dropdown-menu:before {
  content: '';
  border-top: 10px solid #34495e;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -10px;
  z-index: 10;
}
</style>
