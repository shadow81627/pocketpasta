<template>
  <div class="a2a_kit a2a_kit_size_32 a2a_default_style d-print-none">
    <a class="a2a_dd" href="https://www.addtoany.com/share" />
    <a class="a2a_button_facebook" />
    <a class="a2a_button_twitter" />
    <a class="a2a_button_email" />
    <a class="a2a_button_reddit" />
    <a class="a2a_button_pinterest" />
    <a class="a2a_button_linkedin" />
    <a class="a2a_button_copy_link" />
    <a class="a2a_button_print" />
  </div>
</template>

<script>
export default {
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
