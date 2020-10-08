const puppeteer = require('puppeteer-extra');
const cheerio = require('cheerio');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// add stealth plugin and use defaults (all evasion techniques)
puppeteer.use(StealthPlugin());

/**
 * Main top level async/await
 */
(async () => {
  const url =
    'https://shop.coles.com.au/a/sunnybank-hills/product/onions-brown-shallots-loose';
  const browserOptions = {
    headless: false,
    slowMo: 250,
    devtools: true,
    waitUntil: 'networkidle0',
    defaultViewport: null,
  };
  const browser = await puppeteer.launch(browserOptions);
  try {
    // fetch puppeteer browser rendered html
    const page = await browser.newPage();
    const timeout = 1200000; // timeout in milliseconds.
    await page.goto(url, { waitUntil: 'networkidle0', timeout });
    await page.waitForTimeout(15000);
    const data = await page.evaluate(
      () => document.querySelector('*').outerHTML,
    );
    await browser.close();
    const $ = cheerio.load(data);
    // get a unique list of valid urls on the same origin
    const linkData = $('script[type="application/ld+json"]').html();
    console.log(linkData);
  } catch (error) {
    console.log(error);
    await browser.close();
  }
})();
