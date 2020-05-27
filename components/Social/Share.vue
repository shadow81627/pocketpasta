<template>
  <div
    class="a2a_kit a2a_kit_size_32 a2a_default_style d-print-none"
    style="min-height: 32px;"
  >
    <a class="a2a_dd" href="https://www.addtoany.com/share" />
    <a class="a2a_button_facebook d-none d-md-block" />
    <a class="a2a_button_twitter d-none d-md-block" />
    <a class="a2a_button_email d-none d-md-block" />
    <a class="a2a_button_reddit d-none d-md-block" />
    <a class="a2a_button_pinterest d-none d-md-block" />
    <a class="a2a_button_linkedin d-none d-md-block" />
    <a class="a2a_button_copy_link d-none d-md-block" />
    <a class="a2a_button_print d-none d-md-block" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          once: true,
          skip: process.server,
          async: '',
          src: 'https://static.addtoany.com/menu/page.js',
        },
      ],
    };
  },
};
</script>
