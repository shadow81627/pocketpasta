const { readFile, writeFile, mkdir } = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const slugify = require('slugify');
const sortobject = require('deep-sort-object');
const merge = require('deepmerge');
const he = require('he');
const scrape = require('./scrape');
const getFiles = require('./getFiles');

const urls = [
  // ['https://shop.coles.com.au/a/caboolture/product/coles-pasta-large-shells'],
  // ['https://www.biggerbolderbaking.com/microwave-mug-pizza/'],
  // ['https://www.thecraftpatchblog.com/chocolate-mug-cake/'],
  // ['https://temeculablogs.com/blueberry-muffin-in-a-mug/'],
  // ['https://healthynibblesandbits.com/egg-fried-rice-mug/'],
];

const urlBlacklist = [
  'https://www.reddit.com/r/4chan/comments/bk8hu5/anon_fools_an_nbc_roastie_with_his_salad_lasagna/',
];

const fileUrlMap = {};

/**
 * Main top level async/await
 */
(async () => {
  const collection = 'recipes';
  // get list of urls to crawl from content files
  for await (const filename of getFiles(`content/${collection}`)) {
    const file = await readFile(filename, { encoding: 'utf8' });
    const content = JSON.parse(file);
    // && urls.length === 0
    if (
      content.sameAs &&
      !content.sameAs.some((item) => urlBlacklist.includes(item))
    ) {
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
    if (chunkData && chunkData.length) {
      if (fileUrlMap[_.head(chunk)]) {
        const file = JSON.parse(
          await readFile(fileUrlMap[_.head(chunk)], {
            encoding: 'utf8',
          }),
        );
        chunkData.push(file);
      }
      _.reverse(chunkData);
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

      const recipeIngredientChunkData = _.find(chunkData, 'recipeIngredient');
      if (
        recipeIngredientChunkData &&
        recipeIngredientChunkData.recipeIngredient
      ) {
        const recipeIngredient = recipeIngredientChunkData.recipeIngredient;
        linkData.recipeIngredient = _.uniq(_.map(recipeIngredient, _.trim));
      }

      const recipeInstructionsChunkData = _.find(
        chunkData,
        'recipeInstructions',
      );
      if (
        recipeInstructionsChunkData &&
        recipeInstructionsChunkData.recipeInstructions
      ) {
        const recipeInstructions =
          recipeInstructionsChunkData.recipeInstructions;
        const recipeInstructionsArray =
          typeof recipeInstructions === 'string'
            ? recipeInstructions
                .split(/([.!?][^)])/)
                .map((instruction) => he.decode(instruction))
                .map((instruction) =>
                  _.trim((instruction || '').replace(/(<([^>]+)>)/gi, '')),
                )
                .filter(Boolean)
                .map((instruction) => {
                  const text = instruction.replace(/([^.!?])$/, '$1.');
                  return {
                    '@type': 'HowToStep',
                    text,
                  };
                })
            : (recipeInstructions || [])
                // .map((instruction) => ({
                //   ...instruction,
                //   text: he.decode(instruction),
                // }))
                .map((instruction) => ({
                  ...instruction,
                  text: _.trim(
                    (instruction || { text: '' }).text.replace(
                      /(<([^>]+)>)/gi,
                      '',
                    ),
                  ),
                }))
                .filter(({ text }) => Boolean(text))
                .map((instruction) => ({
                  ...instruction,
                  text: instruction.text.replace(/([^.!?])$/, '$1.'),
                }));
        linkData.recipeInstructions = _.uniq(recipeInstructionsArray);
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
        JSON.stringify(sortobject(linkData), undefined, 2) + '\n',
      );
    }
  }
})();
