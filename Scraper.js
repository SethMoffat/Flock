import puppeteer from 'puppeteer';
import celebrityList from './constants/celebrityList';

async function scrapeInstagram(handle) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://inflact.com/profiles/instagram-viewer`);

  const images = await page.evaluate(() => {
    const imageNodes = document.querySelectorAll('article img');
    const imageUrls = Array.from(imageNodes).map(img => img.src);
    return imageUrls;
  });

  await browser.close();
  return images;
}

async function scrapeCelebrities() {
  const allImages = [];

  for (const celeb of celebrityList) {
    const images = await scrapeInstagram(celeb.handle);
    allImages.push(...images);
  }

  return allImages;
}

export default scrapeCelebrities;