const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const slugify = require('slugify');
const he = require('he');

const url = 'https://www.bonappetit.com/recipe/easy-no-knead-focaccia';

axios.get(url).then(({ data }) => {
  const $ = cheerio.load(data);
  const linkDataHtml = $('script[type="application/ld+json"]').html();
  const linkDataHtmlDecoded = he.decode(linkDataHtml);
  const linkData = JSON.parse(linkDataHtmlDecoded);
  if (linkData) {
    const sameAs = [url];
    if (linkData.sameAs) {
      sameAs.concat(linkData.sameAs);
    }
    if (typeof linkData.nutrition !== 'object') {
      linkData.nutrition = undefined;
    }
    fs.writeFileSync(
      `content/recipes/${slugify(linkData.name, {
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
      })}.json`,
      JSON.stringify(
        {
          ...linkData,
          sameAs,
          '@context': undefined,
          '@type': undefined,
        },
        null,
        ' ',
      ),
    );
  }
});
