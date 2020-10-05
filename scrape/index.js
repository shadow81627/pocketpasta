const { readFile, writeFile, mkdir } = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const slugify = require('slugify');
const sortobject = require('deep-sort-object');
const merge = require('deepmerge');
const he = require('he');
const yargs = require('yargs');
const pluralize = require('pluralize');
const { Duration } = require('luxon');
const { normalizeWhiteSpaces } = require('normalize-text');
const scrape = require('./scrape');
// const punctuation = require('./punctuation');
const getFiles = require('./getFiles');

const argv = yargs
  .command('scrape', 'Crawl urls with browser', {})
  .option('scrape', {
    alias: 's',
    description: 'Crawl urls with browser',
    type: 'boolean',
    default: true,
  })
  .option('only-new', {
    alias: 'n',
    description: 'Only use default urls',
    type: 'boolean',
    default: false,
  })
  .option('collection', {
    alias: 'c',
    description: 'Collection',
    type: 'string',
    default: '',
  })
  .help()
  .alias('help', 'h').argv;

/**
 * Handy regex for selecting hrefs
 * Regex: "(https:\/\/www.budgetbytes.com\/.[^"]+)"
 * example: <a href="https://www.budgetbytes.com/black-bean-avocado-enchiladas/"],>[
 */

const urls = [
  // ['https://www.budgetbytes.com/soy-marinated-tofu-bowls-spicy-peanut-sauce/'],
  // ['https://www.budgetbytes.com/vegan-red-lentil-stew/'],
  // ['https://www.budgetbytes.com/sesame-tempeh-bowls/'],
  // ['https://www.budgetbytes.com/smoky-potato-chickpea-stew/'],
  // ['https://www.budgetbytes.com/creamy-coconut-curry-lentils-with-spinach/'],
  // ['https://www.budgetbytes.com/easy-cauliflower-and-chickpea-masala/'],
  // ['https://www.budgetbytes.com/mexican-lentil-stew/'],
  // ['https://www.budgetbytes.com/simple-mushroom-broccoli-stir-fry-noodles/'],
  // [
  //   'https://www.budgetbytes.com/roasted-cauliflower-salad-lemon-tahini-dressing/',
  // ],
  // ['https://www.budgetbytes.com/chili-garlic-tofu-bowls/'],
  // ['https://www.budgetbytes.com/vegan-winter-lentil-stew/'],
  // ['https://www.budgetbytes.com/moroccan-lentil-vegetable-stew-meal-prep/'],
  // ['https://www.budgetbytes.com/chipotle-portobello-oven-fajitas/'],
  // ['https://www.budgetbytes.com/sweet-chili-tofu-bowls/'],
  // ['https://www.budgetbytes.com/chunky-lentil-vegetable-soup/'],
  // ['https://www.budgetbytes.com/spanish-chickpeas-and-rice/'],
  // ['https://www.budgetbytes.com/apple-dijon-kale-salad/'],
  // ['https://www.budgetbytes.com/coconut-jerk-peas-pineapple-salsa/'],
  // ['https://www.budgetbytes.com/one-pot-roasted-red-pepper-pasta/'],
  // ['https://www.budgetbytes.com/african-peanut-stew-vegan/'],
  // ['https://www.budgetbytes.com/pan-fried-sesame-tofu-with-broccoli/'],
  // ['https://www.budgetbytes.com/curried-chickpeas-spinach/'],
  // ['https://www.budgetbytes.com/cold-peanut-noodle-salad/'],
  // ['https://www.budgetbytes.com/smoky-potato-chickpea-stew/'],
  // ['https://www.budgetbytes.com/fresh-tomato-basil-pasta-with-ricotta/'],
  // ['https://www.budgetbytes.com/bbq-bean-sliders/'],
  // ['https://www.budgetbytes.com/spanish-chickpeas-and-rice/'],
  // ['https://www.budgetbytes.com/garlicky-kale-and-ricotta-pizza/'],
  // ['https://www.budgetbytes.com/sweet-potato-tacos-with-lime-crema/'],
  // ['https://www.budgetbytes.com/black-bean-avocado-enchiladas/'],
  // ['https://www.budgetbytes.com/bbq-tofu-sliders/'],
  // ['https://www.budgetbytes.com/cowboy-caviar/'],
  // ['https://www.budgetbytes.com/cheesy-vegetarian-chili-mac/'],
  // ['https://www.budgetbytes.com/chipotle-portobello-oven-fajitas/'],
  // ['https://www.budgetbytes.com/creamy-coconut-curry-lentils-with-spinach/'],
  // ['https://www.budgetbytes.com/curry-roasted-carrots/'],
  // ['https://www.budgetbytes.com/garden-vegetable-lasagna-roll-ups/'],
  // ['https://www.budgetbytes.com/garlic-bread/'],
  // ['https://www.budgetbytes.com/easy-cauliflower-and-chickpea-masala/'],
  // [
  //   'https://www.budgetbytes.com/vegetable-pot-pie-skillet-cheddar-biscuit-topping/',
  // ],
  // ['https://www.budgetbytes.com/sesame-tempeh-bowls/'],
  // ['https://www.budgetbytes.com/smoky-tomato-soup/'],
  // ['https://www.budgetbytes.com/spinach-feta-grilled-cheese/'],
  // ['https://www.budgetbytes.com/poor-mans-burrito-bowls/'],
  // ['https://www.budgetbytes.com/chunky-lentil-vegetable-soup/'],
  // ['https://www.budgetbytes.com/one-pot-roasted-red-pepper-pasta/'],
  // ['https://www.budgetbytes.com/african-peanut-stew-vegan/'],
  // ['https://www.budgetbytes.com/smoky-white-bean-shakshuka/'],
  // ['https://www.budgetbytes.com/curried-chickpeas-spinach/'],
  // ['https://www.budgetbytes.com/simple-mushroom-broccoli-stir-fry-noodles/'],
  // ['https://www.budgetbytes.com/vegan-winter-lentil-stew/'],
  // ['https://www.budgetbytes.com/swamp-soup/'],
  // ['https://www.budgetbytes.com/creamy-white-bean-and-spinach-quesadillas/'],
  // ['https://www.budgetbytes.com/warm-corn-avocado-salad/'],
  // ['https://www.budgetbytes.com/chana-saag/'],
  // [
  //   'https://www.budgetbytes.com/loaded-sweet-potatoes-with-chipotle-lime-crema/',
  // ],
  // ['https://www.budgetbytes.com/cumin-lime-coleslaw/'],
  // ['https://www.budgetbytes.com/tomato-mozzarella-pasta-salad/'],
  // ['https://www.budgetbytes.com/homemade-freezer-garlic-bread/'],
  // ['https://www.budgetbytes.com/smoky-black-bean-soup/'],
  // ['https://www.budgetbytes.com/everyday-cornbread/'],
  // ['https://www.budgetbytes.com/lemony-artichoke-and-quinoa-salad/'],
  // ['https://www.budgetbytes.com/hummus-four-flavors/'],
  // ['https://www.budgetbytes.com/vegan-creamy-mushroom-ramen/'],
  // ['https://www.budgetbytes.com/secret-ingredient-tomato-soup/'],
  // ['https://www.budgetbytes.com/ultimate-southwest-scrambled-eggs/'],
  // ['https://www.budgetbytes.com/mushroom-and-spinach-pasta-with-ricotta/'],
  // ['https://www.budgetbytes.com/french-bread-pizza/'],
  // ['https://www.budgetbytes.com/broccoli-shells-n-cheese/'],
  // ['https://www.budgetbytes.com/turkey-chili-smothered-sweet-potatoes/'],
  // ['https://www.budgetbytes.com/fried-cabbage-and-noodles/'],
  // ['https://www.budgetbytes.com/scallion-herb-chickpea-salad/'],
  // [
  //   'https://www.budgetbytes.com/tomato-herb-rice-with-white-beans-and-spinach/',
  // ],
  // ['https://www.budgetbytes.com/savory-cabbage-pancakes-okonomiyaki/'],
  // ['https://www.budgetbytes.com/simple-sesame-rice/'],
  // ['https://www.budgetbytes.com/spinach-tortellini-soup/'],
  // ['https://www.budgetbytes.com/vegetarian-french-dip-sandwiches/'],
  // ['https://www.budgetbytes.com/thick-cut-garlic-parmesan-oven-fries/'],
  // ['https://www.budgetbytes.com/roasted-broccoli-pasta-with-lemon-and-feta/'],
  // ['https://www.budgetbytes.com/make-ahead-bean-and-cheese-burritos/'],
  // ['https://www.budgetbytes.com/chili-roasted-sweet-potatoes/'],
  // ['https://www.budgetbytes.com/sweet-chili-tofu-bowls/'],
  // ['https://www.budgetbytes.com/spinach-orzo-salad-balsamic-vinaigrette/'],
  // ['https://www.budgetbytes.com/homemade-freezer-garlic-bread/'],
  ['https://www.connoisseurusveg.com/vegan-ribs/'],
  [
    'https://shop.coles.com.au/a/sunnybank-hills/product/onions-brown-shallots-loose',
  ],
];

const urlBlacklist = [
  'https://www.reddit.com/r/4chan/comments/bk8hu5/anon_fools_an_nbc_roastie_with_his_salad_lasagna/',
];

const fileUrlMap = {};

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

function formatString(value) {
  const removeDuplicateSpaces = (str) => str.replace(/\s+/g, ' ');
  const removeHtml = (str) => str.replace(/(<([^>]+)>)/gi, '');
  const replaceFractionSlash = (str) =>
    str
      .normalize('NFKD')
      .replace(/(\d)⁄(\d+)/g, ' $1/$2 ')
      .normalize();
  const removeDuplicateParenthesis = (str) =>
    str.replace(/([()])(?=[()])/g, '');
  const removeDuplicatePunctuation = (str) =>
    str.replace(/([.!?,;])(?=[.!?,;])/g, '');
  const removeSpaceBeforePunctuation = (str) =>
    str.replace(/\s+([.!?,;])/g, '$1');

  return pipe(
    he.decode,
    removeHtml,
    replaceFractionSlash,
    // normalizeDiacritics,
    normalizeWhiteSpaces,
    removeDuplicateSpaces,
    removeDuplicateParenthesis,
    removeSpaceBeforePunctuation,
    removeDuplicatePunctuation,
    // punctuation,
    _.trim,
  )(value);
}

function formatIngredient(ingredient) {
  // turn objects into strings
  if (
    typeof ingredient === 'object' &&
    ingredient.quantity &&
    ingredient.ingredient
  ) {
    return formatString(
      `${
        ingredient.quantity && ingredient.quantity !== 'N/A'
          ? ingredient.quantity
          : ''
      } ${ingredient.ingredient}`,
    );
  } else {
    return formatString(ingredient);
  }
}

function fromatInstructions(instructions) {
  return (
    instructions
      // ensure instruction.text is a string
      .map((instruction) =>
        instruction.text ? instruction : { text: instruction || '' },
      )
      // add type
      .map((instruction) => ({ ...instruction, '@type': 'HowToStep' }))
      .map((instruction) => ({
        ...instruction,
        text: formatString(instruction.text),
      }))
      // rename stepImageUrl
      // TODO: check iamge is public
      .map((instruction) => ({
        ...instruction,
        image: instruction.image || instruction.stepImageUrl,
        stepImageUrl: undefined,
        url: undefined,
        name: undefined,
      }))
      // remove empty
      .filter(({ text }) => Boolean(text))
      // ensure ends with punctuation
      .map((instruction) => ({
        ...instruction,
        text: instruction.text,
        // .replace(/([^.!?])$/, '$1.')
        // remove whitespace before punctuation / non-word characters
        // .replace(/\s+(\W)/g, '$1'),
      }))
  );
}

function parseDuration(duration) {
  return `PT${((duration || '').match(/(\d+)/g) || [''])[0]}${
    (duration || '').search('mins') ? 'M' : 'H'
  }`;
}

/**
 * Main top level async/await
 */
(async () => {
  // get list of urls to crawl from content files
  for await (const filename of getFiles(`content/${argv.collection}`)) {
    const file = await readFile(filename, { encoding: 'utf8' });
    const content = JSON.parse(file);
    // && urls.length === 0
    if (
      content &&
      !content.sameAs &&
      content.slug &&
      content.author &&
      content.author === 'Yaman Agarwal'
    ) {
      // if recipe and author is Yaman Agarwal then cooking shooking so url = https://cscom-2019.web.app/${slug}
      content.sameAs = [`https://cscom-2019.web.app/${content.slug}`];
    }

    if (
      !argv['only-new'] &&
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
    if (argv.scrape) {
      for (const url of chunk) {
        console.log(url);
        const linkData = await scrape(url);
        if (linkData) {
          chunkData.push(linkData);
        }
      }
    }

    if (fileUrlMap[_.head(chunk)]) {
      const file = JSON.parse(
        await readFile(fileUrlMap[_.head(chunk)], {
          encoding: 'utf8',
        }),
      );
      chunkData.push(file);
    }
    // make sure existing file is first so all other data gets merged onto it.
    _.reverse(chunkData);

    // normalize attribute names
    chunkData.forEach((item, index) => {
      chunkData[index] = {
        ...item,
        recipeIngredient: item.recipeIngredient || item.recipeIngredients,
        recipeIngredients: undefined,
        name: item.name || item.title,
        title: undefined,
        description: item.description || item.content,
        content: undefined,
        id: undefined,
        categories: undefined,
        image: item.image || item.featuredImage,
        featuredImage: undefined,
        publish: undefined,
        slug: undefined,
        // youtubeUrl: undefined,
        recipeInstructions: item.recipeInstructions || item.recipeSteps,
        recipeSteps: undefined,
        featuredRecipe: undefined,
        keywords:
          item.keywords ||
          (item.searchTags && Array.isArray(item.searchTags)
            ? _.uniq(_.map(item.searchTags, _.trim)).join(', ')
            : undefined),
        searchTags: undefined,
        recipeNotes: undefined,
        recipeIntros: undefined,
      };
    });

    const overwriteMerge = (destinationArray, sourceArray, options) =>
      _.unionWith(destinationArray, sourceArray, _.isEqual);
    const linkData = merge.all(chunkData, { arrayMerge: overwriteMerge });

    if (linkData.name) {
      const filename = fileUrlMap[_.head(chunk)];
      const slug = path.basename(
        filename ||
          slugify(linkData.name, {
            lower: true,
            strict: true,
          }),
        '.json',
      );

      const collection = filename
        ? path.basename(path.dirname(filename))
        : _.upperFirst(linkData['@type']);

      const type =
        _.upperFirst(linkData['@type']) ||
        _.upperFirst(pluralize(collection, 1));
      linkData['@type'] = type;

      if (linkData.additionalProperty) {
        linkData.additionalProperty = _.uniqBy(
          linkData.additionalProperty,
          'name',
        );
      }

      if (linkData.prepTime && !Duration.fromISO(linkData.prepTime).toJSON()) {
        linkData.prepTime = parseDuration(linkData.prepTime);
      }
      if (
        linkData.totalTime &&
        !Duration.fromISO(linkData.totalTime).toJSON()
      ) {
        linkData.totalTime = parseDuration(linkData.totalTime);
      }
      if (linkData.cookTime && !Duration.fromISO(linkData.cookTime).toJSON()) {
        linkData.cookTime = parseDuration(linkData.cookTime);
      }

      const recipeIngredientChunkData = _.find(chunkData, 'recipeIngredient');
      if (
        recipeIngredientChunkData &&
        recipeIngredientChunkData.recipeIngredient
      ) {
        const recipeIngredient = recipeIngredientChunkData.recipeIngredient;
        const recipeIngredientArray =
          recipeIngredient &&
          recipeIngredient.length > 0 &&
          typeof recipeIngredient[0] === 'object' &&
          recipeIngredient[0].group &&
          recipeIngredient[0].group.ingredients
            ? recipeIngredient[0].group.ingredients
            : recipeIngredient;

        linkData.recipeIngredient = _.uniq(
          _.map(recipeIngredientArray.map(formatIngredient), _.trim),
        );
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
          (typeof recipeInstructions === 'string'
            ? formatString(recipeInstructions).match(/[^.!?]+[.!?]+[^)]/g)
            : // deal try and handle groups...?
            recipeInstructions &&
              recipeInstructions.length > 0 &&
              recipeInstructions[0].group
            ? recipeInstructions[0].group.steps
            : recipeInstructions) || [];

        linkData.recipeInstructions = _.uniq(
          fromatInstructions(recipeInstructionsArray),
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
          const folder = `content/offers/${slug}`;
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

      linkData.name = linkData.name || linkData.title;

      if (linkData.youtubeUrl) {
        const crawlUrl = linkData.youtubeUrl.replace('/embed/', '/watch/');
        const video = await scrape(crawlUrl);
        if (video) {
          linkData.video = video;
          linkData.youtubeUrl = undefined;
          if (!linkData.name) {
            linkData.name = formatString(video.name);
          }
          if (!linkData.description) {
            linkData.description = formatString(video.description);
          }
        }
      }

      await writeFile(
        `content/${pluralize(type)}/${slug}.json`,
        JSON.stringify(sortobject(linkData), undefined, 2) + '\n',
      );
    }
  }
})();
