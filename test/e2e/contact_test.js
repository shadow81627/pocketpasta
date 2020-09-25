/* eslint-disable no-undef */

const name = 'contact';

Feature(name);

Scenario('Heading 1', async (I) => {
  I.amOnPage(`/${name}`);
  I.see('Contact Us', 'h1');

  I.saveScreenshot(`${name}.png`);
  await I.seeVisualDiff(`${name}.png`);
});
