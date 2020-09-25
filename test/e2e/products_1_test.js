/* eslint-disable no-undef */

const name = 'products_1';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name.replace('_', '/')}`);
  I.see('Annalisa Tomatoes Peeled 400g', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
