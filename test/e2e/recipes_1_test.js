/* eslint-disable no-undef */

const slug = 'recipes_1';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug.replace('_', '/')}`);
  I.see('Audrey Hepburn’s Spaghetti Al Pomodoro Recipe by Tasty', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
