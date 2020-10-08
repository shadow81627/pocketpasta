const fs = require('fs');
const { writeFile } = require('fs').promises;
const csv = require('csv-parser');
const sortobject = require('deep-sort-object');
const slugify = require('slugify');
const _ = require('lodash');

fs.createReadStream('scrape/openfoodfacts_search.csv')
  .pipe(csv({ separator: '\t' }))
  .on(
    'data',
    ({
      code: gtin13,
      product_name: name,
      image_url: image,
      brands = '',
      created_t: createdAt,
      last_modified_t: updatedAt,

      'energy-kj_100g': calories,
      fat_100g: fatContent,
      'saturated-fat_100g': saturatedFatContent,
      carbohydrates_100g: carbohydrateContent,
      sugars_100g: sugarContent,
      sodium_100g: sodiumContent,
      proteins_100g: proteinContent,
    }) => {
      const slug = slugify(name, {
        lower: true,
        strict: true,
      });
      if (slug && image && calories) {
        writeFile(
          `content/products/${slug}.json`,
          JSON.stringify(
            sortobject({
              '@type': 'Product',
              gtin13,
              name: _.startCase(name),
              image,
              createdAt,
              updatedAt,
              brand: brands
                ? {
                    '@context': 'http://schema.org',
                    '@type': 'Organization',
                    name: _.head(brands.split(',')),
                  }
                : undefined,
              additionalProperty: [
                {
                  '@type': 'NutritionInformation',
                  name: 'nutrition',
                  calories,
                  carbohydrateContent,
                  fatContent,
                  proteinContent,
                  saturatedFatContent,
                  servingSize: '100 g',
                  sodiumContent,
                  sugarContent,
                },
              ],
            }),
            undefined,
            2,
          ) + '\n',
        );
      }
    },
  );
