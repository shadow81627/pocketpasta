/* eslint-disable no-undef */

const slug = 'products_1';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug.replace('_', '/')}`);
  I.see('Annalisa Tomatoes Peeled 400g', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
