const { MongoClient } = require("mongodb");

// DB Url & Name
const url = require("./compass_url");
const dbName = "bank";

// Repo & Collection & Data
const bankRepo = require("./repos/bankRepo");
const data = require("./sampleAccounts.json");
const collection_name = "accounts";

async function main() {
  // connectToDatabase()
  const client = new MongoClient(url);
  await client.connect();

  try {
    // Insert/Load data into  db
    const results = await bankRepo.loadData(data);
    // Get Data from Db
    const getData = await bankRepo.get();

    // Filter Data from DB
    const filterData = await bankRepo.get({ Account: getData[2].account_id });
    console.log(filterData);
  } catch (error) {
    console.log(error);
  } finally {
    // listDatabases()
    const admin = client.db(dbName).admin();
    console.log(await admin.listDatabases());

    // Clean Db
    // await client.db(dbName).dropDatabase();

    // Close Connection
    // client.close();
  }
}

main();
