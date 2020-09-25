/* eslint-disable no-undef */

const name = 'recipes_2';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name.replace('_', '/')}`);
  I.see('Binging with Babish: Pasta Aglio e Olio from "Chef"', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
