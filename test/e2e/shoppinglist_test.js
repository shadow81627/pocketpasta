/* eslint-disable no-undef */

const name = 'shoppinglist';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name}`);
  I.see('Shopping', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
