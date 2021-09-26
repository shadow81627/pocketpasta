/* eslint-disable no-undef */

const slug = 'shoppinglist';

Feature(slug);

Scenario('Heading 1', async ({ I }) => {
  I.amOnPage(`/${slug}`);
  I.see('Shopping', 'h1');
  I.click('Create a new Shopping list item');
  I.fillField('shopping-name', 'bread');
  I.fillField('shopping-category', 'lunch');
  I.click('Save');
  I.see('lunch');
  I.see('bread');
  I.click('edit');
  I.fillField('shopping-name', 'egg');
  I.click('Save');
  I.see('egg');
  I.click('delete');
  I.click('Yes');
  I.wait(5);

  I.saveScreenshot(`${slug}.png`);
  await I.seeVisualDiff(`${slug}.png`);
});
