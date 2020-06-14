const sortobject = require('deep-sort-object');

function formatFile(linkData) {
  sortobject({
    ...linkData,
    // sameAs,
    '@context': undefined,
    '@type': undefined,
  });
}

module.exports = formatFile;
