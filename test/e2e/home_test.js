/* eslint-disable no-undef */

const slug = 'home';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/`);
  I.see('PocketPasta', 'h1');

  I.click('#app-bar-nav-icon');
  I.see('Recipes', '#navigation-drawer');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
