const { MongoClient } = require("mongodb");
const assert = require("assert");

// DB Url & Name
const url = "mongodb://localhost:27017/";
const dbName = "circulation";

// Repo & Collection & Data
const circulationRepo = require("./repos/circulationRepo.js");
const data = require("./circulation.json");

async function main() {
  // connectToDatabase()
  const client = new MongoClient(url);
  await client.connect();

  try {
    // Insert/Load data into db with loadData()
    const results = await circulationRepo.loadData(data);
    assert.equal(data.length, results.insertedCount);

    // Get data from db with get()
    const getData = await circulationRepo.get();
    assert.equal(data.length, getData.length);

    // Filter Data from db with a query on get({query})
    const filterData = await circulationRepo.get({
      Newspaper: getData[4].Newspaper,
    });
    assert.deepEqual(filterData[0], getData[4]);
    console.log(filterData[0]);

    // Limit Data
  } catch (error) {
    console.log(error);
  } finally {
    // listDatabases()
    const admin = client.db(dbName).admin();

    // Clean DB
    await client.db(dbName).dropDatabase();

    console.log(await admin.listDatabases());

    // Close connectToDatabase()
    client.close();
  }
}

main();
