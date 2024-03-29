import promptModule from "prompt-sync";
import Parser from "rss-parser";
const parser = new Parser();
const prompt = promptModule({ sigint: true });

const customItems = [];

const res = prompt("Add item: ");
const [title, link] = res.split(",");
if (![title, link].includes(undefined)) customItems.push({ title, link });

const main = async () => {
  const feedItems = [];
  const awaitableRequests = urls.map((url) => parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
  aggregate(responses, feedItems);
  print(feedItems);
};

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.specialtyfood.com/rss/featured-articles/category/lunch/",
  "https://www.reddit.com/r/recipes/.rss",
];

const aggregate = (responses, feedItems) => {
  for (let { items } of responses) {
    for (let { title, link } of items) {
      if (title.toLowerCase().includes("veg")) {
        feedItems.push({ title, link });
      }
    }
  }
  return feedItems;
};
const print = (feedItems) => {
  console.clear();
  console.table(feedItems);
  console.log("Last updated ", new Date().toUTCString());
};

main();
