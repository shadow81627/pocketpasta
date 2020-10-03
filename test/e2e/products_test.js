/* eslint-disable no-undef */

const name = 'products';

Feature(name);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${name}`);
  I.see('Products', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
