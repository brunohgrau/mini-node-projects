const { convertCsv } = require("./csv.parse");
const { readFileSync } = require("fs");

try {
  const data = readFileSync("./data/pulitzer-circulation-data.csv", "utf-8");

  console.table(convertCsv(data));
} catch (error) {
  console.log(`Èrror with file:${err}`);
}
