/* eslint-disable no-undef */

const slug = 'tasks';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug}`);
  I.see('Tasks', 'h1');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
