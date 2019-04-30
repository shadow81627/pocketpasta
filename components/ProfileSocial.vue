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
