const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

module.exports = {
  plugins: [
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
      ],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
      headless: false,
      renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
        renderAfterElementExists: '#app',
      }),
    }),
  ],
};
