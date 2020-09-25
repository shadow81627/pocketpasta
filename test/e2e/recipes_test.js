/* eslint-disable no-undef */

const name = 'recipes';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name}`);
  I.see('Recipes', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
