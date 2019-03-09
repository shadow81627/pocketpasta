/* eslint-disable */

export default ({ app }) => {
  /*
   ** Only run on client-side and only in production mode
   */
  // if (process.env.NODE_ENV !== 'production') return
  /*
   ** Include Google Analytics Script
   */
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  /*
   ** Set the current page
   */
  gtag('config', 'UA-125711214-1');
  /*
   ** Every time the route changes (fired on initialization too)
   */
  app.router.afterEach((to, from) => {
    /*
     ** We tell Google Analytics to add a `pageview`
     */
    gtag('set', 'page', to.fullPath);
    gtag('send', 'pageview');
  });
};
