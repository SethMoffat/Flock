import axios from 'axios';
import cheerio from 'cheerio';
import celebrityList from './constants/celebrityList';

async function scrapeInstagram(handle) {
  const { data } = await axios.get(`https://inflact.com/profiles/instagram-viewer/${handle}`);
  const $ = cheerio.load(data);

  const images = [];
  $('.post-wrapper img').each((i, elem) => {
    const imageUrl = $(elem).attr('src');
    if (imageUrl) {
      images.push(imageUrl);
    }
  });

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