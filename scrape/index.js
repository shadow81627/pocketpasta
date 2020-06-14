const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const slugify = require('slugify');
const he = require('he');
// const _ = require('lodash');
const sortobject = require('deep-sort-object');

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  );

// const url =
//   'https://www.woolworths.com.au/shop/productdetails/384568/arnott-s-ginger-nut';

const url =
  'https://www.woolworths.com.au/shop/productdetails/750176/taylors-of-harrogate-yorkshire-tea-bags';

axios.get(url).then(({ data }) => {
  const $ = cheerio.load(data);
  const linkDataHtml = $('script[type="application/ld+json"]').html();
  const linkDataHtmlDecoded = he.decode(linkDataHtml);
  const linkDataHtmlDecodedTagsStripped = cheerio
    .load(linkDataHtmlDecoded)
    .text();
  const linkData = JSON.parse(linkDataHtmlDecodedTagsStripped);

  if (linkData) {
    const type = linkData['@type'].toLowerCase();
    let sameAs = [url];
    if (linkData.sameAs) {
      sameAs = sameAs.concat(linkData.sameAs);
    }
    if (type === 'product') {
      if (url.includes('woolworths')) {
        const price = $('.price').text();
        const nutritionScraped = {};
        $('.nutrition-row').each(function (i, rowElement) {
          const key = slugify(
            $($('.nutrition-column', rowElement).get(0)).text(),
            { lower: true, strict: true, replacement: '_' },
          );
          const value = $($('.nutrition-column', rowElement).get(1))
            .text()
            .trim();
          nutritionScraped[key] = value;
        });
        const nutritionKeyRenameMap = {
          energy: 'calories',
          protein: 'proteinContent',
          fat_total: 'fatContent',
          saturated: 'saturatedFatContent',
          carbohydrate: 'carbohydrateContent',
          sugars: 'sugarContent',
          sodium: 'sodiumContent',
        };
        const nutrition = renameKeys(nutritionKeyRenameMap, nutritionScraped);
        linkData.additionalProperty = linkData.additionalProperty
          ? linkData.additionalProperty
          : [];
        if (nutrition && Object.keys(nutrition).length) {
          linkData.additionalProperty.push({
            ...nutrition,
            '@type': 'NutritionInformation',
            name: 'nutrition',
            servingSize: '100 g',
          });
        }
        if (!linkData.offers) {
          linkData.offers = { price };
        } else if (!linkData.offers.price) {
          linkData.offers.price = price;
        }
      }
    }
    if (linkData.offers && !Array.isArray(linkData.offers)) {
      const woolworths = {
        offeredBy: 'Woolworths',
        seller: {
          '@type': 'Organization',
          name: 'Woolworths',
        },
      };
      if (url.includes('woolworths')) {
        linkData.offers = {
          offers: [
            {
              '@type': 'Offer',
              '@context': 'http://schema.org',
              url,
              ...linkData.offers,
              ...woolworths,
            },
          ],
        };
      } else {
        linkData.offers = undefined;
      }
    }
    fs.writeFileSync(
      `content/${type}s/${slugify(linkData.name, {
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
      })}.json`,
      JSON.stringify(
        sortobject({
          ...linkData,
          sameAs,
          '@context': undefined,
          '@type': undefined,
        }),
        undefined,
        2,
      ) + '\n',
    );
  }
});
