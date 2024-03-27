const axios = require('axios');
const cheerio = require('cheerio');
const celebrityList = require('./constants/celebrityList');
// const puppeteer = require('puppeteer');

async function scrapeInstagram(handle) {
  const { data } = await axios.get(`https://www.instagram.com/${handle}`);
  const $ = cheerio.load(data);
  const script = $('script[type="text/javascript"]').eq(3).html();
  const scriptRegex = /window\._sharedData = ({.*);<\/script>/;
  const json = JSON.parse(script.match(scriptRegex)[1]);
  const posts = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;

  return posts.map(post => ({
    url: `https://inflact.com/profiles/instagram-viewer/`,
    imageUrl: post.node.display_url,
    timestamp: post.node.taken_at_timestamp
  })).sort((a, b) => b.timestamp - a.timestamp); // Sort in chronological order
}

async function scrapeCelebrities() {
  const allImages = [];

  for (const celeb of celebrityList) {
    const images = await scrapeInstagram(celeb.handle);
    allImages.push(...images);
  }

  return allImages;
}

module.exports = scrapeCelebrities;