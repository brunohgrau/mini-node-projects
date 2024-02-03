const { convertCsv } = require("../csv.parse");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const read = async () => {
  const data = await readFile("./data/pulitzer-circulation-data.csv", "utf-8");
  console.log(convertCsv(data));
};

read();
