/* eslint-disable no-undef */

const name = 'recipes_1';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name.replace('_', '/')}`);
  I.see('Audrey Hepburn’s Spaghetti Al Pomodoro Recipe by Tasty', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
