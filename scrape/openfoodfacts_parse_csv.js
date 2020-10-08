const fs = require('fs');
const { writeFile } = require('fs').promises;
const csv = require('csv-parser');
const sortobject = require('deep-sort-object');
const slugify = require('slugify');

fs.createReadStream('scrape/openfoodfacts_search.csv')
  .pipe(csv({ separator: '\t' }))
  .on('data', ({ product_name: name, image_url: image }) => {
    const slug = slugify(name, {
      lower: true,
      strict: true,
    });
    return writeFile(
      `content/products/${slug}.json`,
      JSON.stringify(
        sortobject({ '@type': 'Product', name, image }),
        undefined,
        2,
      ) + '\n',
    );
  });
