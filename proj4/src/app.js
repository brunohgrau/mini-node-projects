const MongoClient = require("mongodb").MongoClient;

// Repo & Data
const circulationRepo = require("./repos/circulationRepo");
const data = require("./circulation.json");

// DB Url & Name
const url = "mongodb://localhost:27017";
const dbName = "circulation";

async function main() {
  // Create & Connect Client
  const client = new MongoClient(url);
  await client.connect();

  // Load Data into DB
  const results = await circulationRepo.loadData(data);
  console.log(results.insertedCount, results.ops);

  const admin = client.db(dbName).admin();
  console.log(await admin.listDatabases());
}

main();
