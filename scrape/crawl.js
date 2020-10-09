const fs = require('fs').promises;
const { firefox } = require('playwright');
const cheerio = require('cheerio');

const crawled = [];

async function crawl(url, origin = new URL(url).origin) {
  const browserOptions = {
    headless: false,
    slowMo: 250,
    waitUntil: 'networkidle0',
    defaultViewport: null,
  };
  const browser = await firefox.launch(browserOptions);
  try {
    // fetch browser rendered html
    const page = await browser.newPage();
    const timeout = 1200000; // timeout in milliseconds.
    await page.goto(url, { waitUntil: 'networkidle0', timeout });
    await page.waitForTimeout(15000);
    const data = await page.evaluate(
      () => document.querySelector('*').outerHTML,
    );
    await browser.close();

    console.log(url);
    crawled.push(url);
    await fs.appendFile('scrape/urls.txt', `${url}\n`);

    const $ = cheerio.load(data);
    // get a unique list of valid urls on the same origin
    const links = $('a[href]')
      .map((i, e) => {
        try {
          const url = new URL($(e).attr('href'), origin);
          const href = `${url.origin}${url.pathname}`;
          if (url.origin === origin && !crawled.includes(href)) {
            return href;
          }
        } catch (_) {
          // invalid url
        }
      })
      .get();

    for (const link of links) {
      await crawl(link, origin);
    }
  } catch (error) {
    console.log(error);
    await browser.close();
  }
}

/**
 * Main top level async/await
 */
(async () => {
  const url =
    'https://www.woolworths.com.au/shop/productdetails/29411/sanofi-hydrogen-peroxide';
  await crawl(url);
})();
