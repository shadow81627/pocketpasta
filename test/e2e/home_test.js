/* eslint-disable no-undef */

const name = 'home';

Feature(name);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/`);
  I.see('PocketPasta', 'h1');

  I.click('#app-bar-nav-icon');
  I.see('Recipes', '#navigation-drawer');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
