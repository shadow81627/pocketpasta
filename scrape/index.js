const { readFile, writeFile, mkdir } = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const slugify = require('slugify');
const sortobject = require('deep-sort-object');
const merge = require('deepmerge');
const scrape = require('./scrape');
const getFiles = require('./getFiles');

const urls = [
  // recipes
  // 'https://www.womensweeklyfood.com.au/recipes/shepherdless-pie-31497',
  // 'https://www.womensweeklyfood.com.au/recipes/crisp-roast-potatoes-with-rosemary-salt-31376',
  // 'https://www.jamieoliver.com/recipes/cheese-recipes/creamy-polenta-with-garlic-and-basil-butter/',
  // 'https://www.thespruceeats.com/turkish-red-lentil-soup-suzme-mercimek-corbasi-recipe-3274346',
  // woolworths products
  // 'https://www.woolworths.com.au/shop/productdetails/750176/taylors-of-harrogate-yorkshire-tea-bags',
  // 'https://www.woolworths.com.au/shop/productdetails/384568/arnott-s-ginger-nut',
  // 'https://www.woolworths.com.au/shop/productdetails/713429/woolworths-garlic-head',
  // 'https://www.woolworths.com.au/shop/productdetails/342970/colgate-savacol-antiseptic-mouth-throat-rinse',
  // 'https://www.woolworths.com.au/shop/productdetails/701038/higher-living-sweet-dreams-tea-bags',
  // 'https://www.woolworths.com.au/shop/productdetails/575845/twinings-digest',
  // 'https://www.woolworths.com.au/shop/productdetails/793384/sanitarium-so-good-long-life-unsweetened-almond-coconut-milk',
  // 'https://www.woolworths.com.au/shop/productdetails/43974/san-remo-spaghetti-pasta-no-5',
  // 'https://www.woolworths.com.au/shop/productdetails/37810/annalisa-tomatoes-peeled',
  // 'https://www.woolworths.com.au/shop/productdetails/73032/oreo-family-pack-original',
  // coles products
  // 'https://shop.coles.com.au/a/caboolture/product/taylors-harrogates-tea-yorkshire-100-pack',
  // 'https://shop.coles.com.au/a/a-national/product/annalisa-tomatoes-peeled',
];

const fileUrlMap = {};

/**
 * Main top level async/await
 */
(async () => {
  // get list of urls to crawl from content files
  for await (const filename of getFiles('content/products')) {
    const file = await readFile(filename, { encoding: 'utf8' });
    const content = JSON.parse(file);
    if (content.sameAs && urls.length === 0) {
      urls.push(content.sameAs);
      for (const url of content.sameAs) {
        fileUrlMap[url] = filename;
      }
    }
  }

  // crawl urls
  for (const chunk of urls) {
    const chunkData = [];
    for (const url of chunk) {
      console.log(url);
      const linkData = await scrape(url);
      if (linkData) {
        chunkData.push(linkData);
      }
    }
    _.reverse(chunkData);
    if (fileUrlMap[_.head(chunk)]) {
      const file = JSON.parse(
        await readFile(fileUrlMap[_.head(chunk)], {
          encoding: 'utf8',
        }),
      );
      chunkData.push(file);
    }
    const overwriteMerge = (destinationArray, sourceArray, options) =>
      _.unionWith(destinationArray, sourceArray, _.isEqual);
    const linkData = merge.all(chunkData, { arrayMerge: overwriteMerge });

    const filename = path.basename(
      fileUrlMap[_.head(chunk)] ||
        slugify(linkData.name, {
          lower: true,
          strict: true,
        }),
      '.json',
    );

    if (linkData.additionalProperty) {
      linkData.additionalProperty = _.uniqBy(
        linkData.additionalProperty,
        'name',
      );
    }

    // dedup and print offers to offers collection
    if (linkData.offers && linkData.offers.offers) {
      linkData.offers.offers = _.uniqBy(linkData.offers.offers, 'offeredBy');
      linkData.offers = {
        priceCurrency: _.head(_.map(linkData.offers.offers, 'priceCurrency')),
        ...linkData.offers,
        '@type': 'AggregateOffer',
        highPrice: Math.max(..._.map(linkData.offers.offers, 'price')),
        lowPrice: Math.min(..._.map(linkData.offers.offers, 'price')),
        offerCount: linkData.offers.offers.length,
      };
      linkData.offers.offers.map(async (offer) => {
        const folder = `content/offers/${filename}`;
        await mkdir(folder, { recursive: true });
        await writeFile(
          `${folder}/${slugify(offer.offeredBy, {
            lower: true,
            strict: true,
          })}.json`,
          JSON.stringify(
            sortobject({
              ...offer,
              '@type': 'Offer',
              '@id': undefined,
              '@context': undefined,
            }),
            undefined,
            2,
          ) + '\n',
        );
      });
    }

    const type = linkData['@type'].toLowerCase();
    await writeFile(
      `content/${type}s/${filename}.json`,
      JSON.stringify(linkData, undefined, 2) + '\n',
    );
  }
})();
