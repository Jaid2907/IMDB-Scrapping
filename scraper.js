const puppeteer = require('puppeteer');

const scraperFunction = async (imdbId) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://www.imdb.com/title/${imdbId}/`);

  let originalOffset = 0;
  while (true) {
    await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');
    await page.waitForTimeout(200);
    let newOffset = await page.evaluate('window.pageYOffset');
    if (originalOffset === newOffset) {
      break;
    }
    originalOffset = newOffset;
  }
  try {
    const f = await page.$('.sc-9eebdf80-1');
    setTimeout(() => {}, 2000);
    console.log(f);
    let text = await (await f.getProperty('textContent')).jsonValue();
    console.log('Text is: ' + text);
    text = text.slice(0, text.indexOf('—'));
    await browser.close();

    return text;
  } catch (err) {
    process.exit();
  }
};

module.exports = { scraperFunction };
