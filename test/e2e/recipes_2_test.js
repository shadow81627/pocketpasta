/* eslint-disable no-undef */

const slug = 'recipes_2';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug.replace('_', '/')}`);
  I.see('Binging with Babish: Pasta Aglio e Olio from "Chef"', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
