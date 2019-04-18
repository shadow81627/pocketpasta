<template>
  <div id="message" class="card bg-light card-body">
    <h2>404</h2>
    <h1>Page Not Found</h1>
    <p>
      The specified file was not found on this website. Please check the URL for
      mistakes and try again.
    </p>
    <nuxt-link to="/" class="btn btn-primary">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: 'Page Not Found',
    };
  },
};
</script>

<style media="screen" scoped>
#message {
  max-width: 360px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
}
#message h3 {
  /* color: #888; */
  font-weight: normal;
  font-size: 16px;
  margin: 16px 0 12px;
}
#message h2 {
  /* color: #4dba87; */
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 8px;
}
#message h1 {
  font-size: 22px;
  font-weight: 300;
  /* color: rgba(0, 0, 0, 0.6); */
  margin: 0 0 16px;
}
#message p {
  line-height: 140%;
  margin: 16px 0 24px;
  font-size: 14px;
}
#message a {
  display: block;
  text-align: center;
  /* background: #039be5; */
  text-transform: uppercase;
  text-decoration: none;
  /* color: white; */
  padding: 16px;
  border-radius: 4px;
}
#message,
#message a {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
#load {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 13px;
}
</style>
