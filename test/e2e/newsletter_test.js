/* eslint-disable no-undef */

const name = 'newsletter';

Feature(name);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${name}`);
  I.see('Subscribe to our mailing list', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
