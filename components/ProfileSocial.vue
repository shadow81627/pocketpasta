<template>
  <div class="mb-3 profile">
    <div class="col-md-12">
      <div class="$col-md-6">
        <h3>{{ name }}</h3>
        <KeyValue label="Job Title" :value="jobTitle" />
        <KeyValue label="About" :value="description" />
        <Keywords :tags="keywords ? keywords.split(',') : []" label="Skills" />
        <div class="py-2 list-inline">
          <div
            class="list-inline-item a2a_kit a2a_kit_size_32 a2a_default_style a2a_follow"
          >
            <a class="a2a_button_twitter" data-a2a-follow="Shadow81627" />
            <a
              class="a2a_button_facebook"
              data-a2a-follow="damien.robinson.5036"
            />
            <a
              class="a2a_button_linkedin"
              data-a2a-follow="damien-robinson-788925101"
            />
            <a class="a2a_button_youtube" data-a2a-follow="shadow81627" />
            <a class="a2a_button_github" data-a2a-follow="shadow81627" />
          </div>
        </div>
      </div>
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
    name: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true },
    sameAs: { type: Array, required: true },
  },
  head() {
    return {
      script: [
        {
          async: '',
          src: 'https://static.addtoany.com/menu/page.js',
        },
      ],
    };
  },
};
</script>

<style scoped>
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
